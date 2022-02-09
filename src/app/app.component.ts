import { Component, OnInit } from '@angular/core';
import Player from '@vimeo/player'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'proyectoTest';

  ngOnInit() {
    const options = {
      id: 657768349,
      width: 640,
      loop: true
    };

    const player = new Player('made-in-ny', options);
    player.ready().then(function () {
      console.log('ready');
    });

    //   player.loadVideo(options).then(function(id) {
    //     console.log('id', id);
    //   }).catch(function(error) {
    //     switch (error.name) {
    //         case 'TypeError':
    //             console.log('Error de id');
    //             break;

    //         case 'PasswordError':
    //             console.log('Error de password');
    //             break;

    //         case 'PrivacyError':
    //             console.log('Error de privacidad');
    //             break;

    //         default:
    //             console.log('Otro error', error);
    //           break;
    //     }
    // });
    const onPlay = function (data) {
      console.info('data', data);
    };
    player.on('play', onPlay);

    // player.setVolume(0);

    player.pause().then(function () {
      console.log('pausa');
    })

    player.play().then(function() {
      console.log('played video');
  })
  }

  unload() {
    const player = new Player('made-in-ny');
    player.unload().then(function () {
      console.log('unload');
    }).catch(function (error) {
    });
  }

  ngOnDestroy() {
    const player = new Player('made-in-ny');
    player.destroy().then(function () {
      console.log('destruido');
    }).catch(function (error) {
      // an error occurred
    });
  }
}
