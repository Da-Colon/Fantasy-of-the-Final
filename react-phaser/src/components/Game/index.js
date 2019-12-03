import React from "react";
import Phaser from "phaser";
import spriteSheet from "./assets/Maps/ff6-tiles.png";
import jsonMap from "./assets/Maps/01-start.json";
import io from "socket.io-client";
import mog from './assets/PlayerSprites/Mog.png'


import {
  GameContainer,
  Main,
  ChatContainer,
  ChatArea,
  MessageList
} from "./styles";

export default function Game() {


  class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: "BootScene",
        active: true
      });
    }

    preload() {
      // Loads Map Tiles and JSON
      this.load.image("tiles", spriteSheet);
      this.load.tilemapTiledJSON("map", jsonMap);
      // Loads Players
      this.textures.addBase64("player", mog);
    }
    create() {
      this.scene.start("WorldScene");
    }
  }

  class WorldScene extends Phaser.Scene {
    constructor() {
      super({
        key: "WorldScene"
      });
    }
    create() {
      const endpoint = "http://localhost:3000"

      this.socket = io(endpoint);
      this.otherPlayers = this.physics.add.group();

      this.createMap();

      this.cursors = this.input.keyboard.createCursorKeys();

      this.socket.on(
        "currentPlayers",
        function(players) {
          Object.keys(players).forEach(
            function(id) {
              if (players[id].playerId === this.socket.id) {
                this.createPlayer(players[id]);
              } else {
                this.addOtherPlayers(players[id]);
              }
            }.bind(this)
          );
        }.bind(this)
      );

      this.socket.on(
        "newPlayer",
        function(playerInfo) {
          this.addOtherPlayers(playerInfo);
        }.bind(this)
      );

      this.socket.on(
        "disconnect",
        function(playerId) {
          this.otherPlayers.getChildren().forEach(
            function(player) {
              if (playerId === player.playerId) {
                player.destroy();
              }
            }
          );
        }.bind(this)
      );

      this.socket.on(
        "playerMoved",
        function(playerInfo) {
          this.otherPlayers.getChildren().forEach(
            function(player) {
              if (playerInfo.playerId === player.playerId) {
                player.flipX = playerInfo.flipX;
                player.setPosition(playerInfo.x, playerInfo.y);
              }
            }
          );
        }.bind(this)
      );
      }

    createMap() {
      this.map = this.make.tilemap({
        key: "map"
      });

      let tiles = this.map.addTilesetImage("ff6-tiles", "tiles", 32, 32);

      this.map.createStaticLayer("Tile Layer 1", tiles, 0, 0);

      this.physics.world.bounds.width = this.map.widthInPixels;
      this.physics.world.bounds.height = this.map.heightInPixels;
    }

    createPlayer(playerInfo) {
      // our player sprite created through the physics system
      this.player = this.add.sprite(0, 0, "player");

      this.container = this.add.container(playerInfo.x, playerInfo.y);
      this.container.setSize(32, 32);
      this.physics.world.enable(this.container);
      this.container.add(this.player);

      this.updateCamera();

      this.container.body.setCollideWorldBounds(true);
      this.physics.add.collider(this.container, this.spawns);
    }

    addOtherPlayers(playerInfo) {
      const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y, 'player', 9);
      otherPlayer.setTint(Math.random() * 0xffffff);
      otherPlayer.playerId = playerInfo.playerId;
      this.otherPlayers.add(otherPlayer);
    }

    updateCamera() {
      // limit camera to map
      this.cameras.main.setBounds(
        0,
        0,
        this.map.widthInPixels,
        this.map.heightInPixels
      );
      this.cameras.main.startFollow(this.container);
      this.cameras.main.roundPixels = true; // avoid tile bleed
    }

    update() {
      if (this.container) {
        this.container.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.container.body.setVelocityX(-80);
        } else if (this.cursors.right.isDown) {
          this.container.body.setVelocityX(80);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
          this.container.body.setVelocityY(-80);
        } else if (this.cursors.down.isDown) {
          this.container.body.setVelocityY(80);
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (this.cursors.left.isDown) {
          this.player.anims.play("left", true);
          this.player.flipX = true;

        } else if (this.cursors.right.isDown) {
          this.player.anims.play("right", true);

        } else if (this.cursors.up.isDown) {
          this.player.anims.play("up", true);
        } else if (this.cursors.down.isDown) {
          this.player.anims.play("down", true);
        } else {
          this.player.anims.stop();
        }

        // emit player movement
        var x = this.container.x;
        var y = this.container.y;
        var flipX = this.player.flipX;
        if (
          this.container.oldPosition &&
          (x !== this.container.oldPosition.x ||
            y !== this.container.oldPosition.y ||
            flipX !== this.container.oldPosition.flipX)
        ) {
          this.socket.emit("playerMovement", { x, y, flipX });
        }
        // save old position data
        this.container.oldPosition = {
          x: this.container.x,
          y: this.container.y,
          flipX: this.player.flipX
        };
      }
    }
  }

  var config = {
    type: Phaser.AUTO,
    parent: "content",
    width: 900,
    height: 640,
    zoom: 1,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0
        },
        debug: false // set to true to view zones
      }
    },
    scene: [BootScene, WorldScene]
  };
  var game = new Phaser.Game(config);
  console.log(game)

  return (
    <Main>
      <GameContainer id="content"></GameContainer>
      <ChatContainer>
        <ChatArea>
          <MessageList id="messages"></MessageList>
        </ChatArea>
        <input
          id="inputMessage"
          style={{ fontSize: "100%" }}
          placeholder="Type here..."
          type="text"
        />
      </ChatContainer>
    </Main>
  );
}
