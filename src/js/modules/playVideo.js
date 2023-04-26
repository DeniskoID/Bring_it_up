export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.player = null;
    this.onPlayerStatechange = this.onPlayerStatechange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;
        if (i % 2 == 0) {
          blockedElem.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}

      btn.addEventListener('click', () => {
        if (
          !btn.closest('.module__video-item') ||
          btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true'
        ) {
          this.activeBtn = btn;
          const path = btn.getAttribute('data-url');

          this.openPlayer(path);
        }
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
        events: {
          onStateChange: this.onPlayerStatechange,
        },
      });
    } else {
      setTimeout(() => {
        this.createPlayer(url);
      }, 100);
    }
  }

  onPlayerStatechange(state) {
    try {
      const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);

      if (state.data === 0) {
        if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
          blockedElem.querySelector('.play__circle').classList.remove('closed');
          blockedElem.querySelector('svg').remove();
          blockedElem.querySelector('.play__circle').appendChild(playBtn);
          blockedElem.querySelector('.play__text').textContent = 'play video';
          blockedElem.querySelector('.play__text').textList = 'attention';
          blockedElem.style.opacity = 1;
          blockedElem.style.filter = 'none';
          blockedElem.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {}
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
