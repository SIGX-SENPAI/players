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
