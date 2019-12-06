import React, { useState } from "react";
import Phaser from "phaser";
import io from "socket.io-client";
import store from "../../../store";

// import map assets
import spriteSheet from "../assets/Maps/ff6-tiles.png";
import jsonMap from "../assets/Maps/map01New.json";

// import player sprites
import mog from "../assets/PlayerSprites/Mog.png";
import celes from "../assets/PlayerSprites/Celes.png";
import cyan from "../assets/PlayerSprites/Cyan.png";
import locke from "../assets/PlayerSprites/Locke.png";
import relm from "../assets/PlayerSprites/Relm.png";
import terra from "../assets/PlayerSprites/Terra.png";

// import enemy sprites
import atma from "../assets/EnemySprites/Atma.gif";

export default function GameEngine() {
  const userInfo = store.getState().user;
  const [user] = useState(userInfo);

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
      function setPlayerAvatar() {
        switch (user.avatar) {
          case "1":
            return locke;
          case "2":
            return celes;
          case "3":
            return cyan;
          case "4":
            return terra;
          case "5":
            return relm;
          case "admin":
            return mog;
          default:
            return console.log("ERROR: You must have be logged in");
        }
      }
      this.textures.addBase64("player", setPlayerAvatar());

      this.load.image("boss", atma);
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
      const endpoint = "http://localhost:3000";

      this.socket = io(endpoint);
      this.otherPlayers = this.physics.add.group();

      this.createMap();

      this.createEnemies();

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
          this.otherPlayers.getChildren().forEach(function(player) {
            if (playerId === player.playerId) {
              player.destroy();
            }
          });
        }.bind(this)
      );

      this.socket.on(
        "playerMoved",
        function(playerInfo) {
          this.otherPlayers.getChildren().forEach(function(player) {
            if (playerInfo.playerId === player.playerId) {
              player.flipX = playerInfo.flipX;
              player.setPosition(playerInfo.x, playerInfo.y);
            }
          });
        }.bind(this)
      );
    }

    createMap() {
      this.map = this.make.tilemap({
        key: "map"
      });

      let tiles = this.map.addTilesetImage("ff6-tiles", "tiles", 32, 32);

      this.map.createStaticLayer("ground", tiles, 0, 0);
      this.map.createStaticLayer("walkable", tiles, 0, 0);
      this.house = this.map.createStaticLayer("house", tiles, 0, 0).setCollisionByExclusion([-1]);
      this.treeTops = this.map.createStaticLayer("tree tops", tiles, 0, 0).setDepth(2);

      
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
      this.physics.add.collider(this.container, this.house);
    }

    addOtherPlayers(playerInfo) {
      const otherPlayer = this.add.sprite(
        playerInfo.x,
        playerInfo.y,
        "player",
        9
      );
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

    createEnemies() {
      // where the enemies will be
      this.spawns = this.physics.add.group({
        classType: Phaser.GameObjects.Sprite
      });
      for (var i = 0; i < 5; i++) {
        const location = this.getValidLocation();
        // parameters are x, y, width, height
        var enemy = this.spawns.create(
          location.x,
          location.y,
          this.getEnemySprite()
        );
        enemy.body.setCollideWorldBounds(true);
        enemy.body.setImmovable();
      }

      // move enemies
      this.timedEvent = this.time.addEvent({
        delay: 3000,
        callback: this.moveEnemies,
        callbackScope: this,
        loop: true
      });
    }

    moveEnemies() {
      this.spawns.getChildren().forEach(enemy => {
        const randNumber = Math.floor(Math.random() * 4 + 2);

        switch (randNumber) {
          case 1:
            enemy.body.setVelocityX(50);
            break;
          case 2:
            enemy.body.setVelocityX(-50);
            break;
          case 3:
            enemy.body.setVelocityY(50);
            break;
          case 4:
            enemy.body.setVelocityY(50);
            break;
          default:
            enemy.body.setVelocityX(50);
        }
      });

      setTimeout(() => {
        this.spawns.setVelocityX(0);
        this.spawns.setVelocityY(0);
      }, 500);
    }

    getEnemySprite() {
      var sprites = ["boss"];
      return sprites[Math.floor(Math.random() * sprites.length)];
    }

    getValidLocation() {
      var validLocation = false;
      var x, y;
      while (!validLocation) {
        x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

        var occupied = false;
        this.spawns.getChildren().forEach(child => {
          if (child.getBounds().contains(x, y)) {
            occupied = true;
          }
        });
        if (!occupied) validLocation = true;
      }
      return { x, y };

    }

    update() {
      if (this.container) {
        this.container.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.container.body.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
          this.container.body.setVelocityX(100);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
          this.container.body.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
          this.container.body.setVelocityY(100);
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

  return <></>;
}
