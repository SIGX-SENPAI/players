import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm';
import '@devmobiliza/videojs-vimeo/dist/videojs-vimeo.cjs';
import 'videojs-youtube';
import 'videojs-seek-buttons';
@Component({
  selector: 'app-vjs-player',
  template: `
    <video #target class="video-js" controls muted playsinline preload="none"></video>
  `,
  styleUrls: [
    './vjs-player.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/maintutorial-options.html
  @Input() options: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      controls: true,
      sources: {
          src: string,
          type: string,
      }[],
  };
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.player.seekButtons({
      forward: 30,
      back: 10
    });
    videojs('video', {
      controls: true,
      plugins: {
          videoJsResolutionSwitcher: {
            default: 'high',
            dynamicLabel: true
          }
        }
    }, function(){

      // Add dynamically sources via updateSrc method
      this.player.updateSrc([
          {
            src: 'http://media.xiph.org/mango/tears_of_steel_1080p.webm',
            type: 'video/webm',
            label: '360'
          },
          {
            src: 'http://mirrorblender.top-ix.org/movies/sintel-1024-surround.mp4',
            type: 'video/mp4',
            label: '720'
          }
        ])

        this.player.on('resolutionchange', function(){
          console.info('Source changed to %s', this.player.src())
        })

    });
    // this.player.currentTime (120)
  }
  ngAfterViewChecked() {
    console.log('duracion', this.player.currentTime ());
    this.player.on('ended', function() {
      console.log('video muerto')
    });
    // for (let i = 0; i < this.player.length; i++) {
    //   this.player[i].addEventListener("ended", () =>{
    //     console.log('deded<sa');
    //   });
    // }
  }
  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
}
