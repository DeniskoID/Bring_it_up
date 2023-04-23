export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.player = null;
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const path = btn.getAttribute('data-url');

        this.openPlayer(path);
      });
    });
  }

  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.closePlayer();
    });
  }

  openPlayer(url) {
    if (this.player === null) {
      this.createPlayer(url);
    } else {
      this.player.loadVideoById(url);
    }

    this.overlay.style.display = 'flex';
  }

  closePlayer() {
    this.overlay.style.display = 'none';
    this.player.stopVideo();
  }

  createPlayer(url) {
    if (typeof YT !== 'undefined' && typeof YT.Player !== 'undefined') {
      this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: url,
      });
    } else {
      setTimeout(() => {
        this.createPlayer(url);
      }, 100);
    }
  }

  init() {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      this.bindTriggers();
      this.bindCloseBtn();
    };
  }
}
