class Notice {
  constructor (message, options = {}) {
    this.message = message;
    this.options = options;
    if (!('autoClose' in this.options)){
      this.options.autoClose = 2300;
    }

    if (!('type' in this.options)){
      this.options.type = 'success';
    }

    this.box = document.createElement('div');
  }

  show () {
    this.box.classList.add('notification', 'notification--' + this.options.type);
    document.body.insertBefore(this.box, document.body.firstChild);
    this.box.innerHTML = `<span class="notification__message">${this.message}</span><span class="notification__close"></span>`;
    setTimeout(() => {
      this.box.classList.add('notification--visible');
      this.bindEvents();
    }, 10);

    if (this.options.autoClose) {
      setTimeout(() => {
        this.remove();
      }, this.options.autoClose);
    }
  }

  success () {
    this.options.type = 'success';
    this.show();
  }

  error () {
    this.options.type = 'error';
    this.show();
  }

  remove () {
    this.box.classList.remove('notification--visible');
    setTimeout(() => {
      this.box.remove();
    }, 200);
  }

  bindEvents () {
    document.querySelector('.notification__close').addEventListener('click', this.remove.bind(this));
  }

}

class BXNoticeDecorator {
  constructor (notice) {
    this.notice = notice;
  }

  show () {
    this.notice.show();
    this.additional();
  }

  success () {
    this.notice.success();
    this.additional();
  }

  error () {
    this.notice.error();
    this.additional();
  }

  additional () {
    if (this.panaled()) {
      this.notice.box.classList.add('notification--panaled')
    }

    if (this.expanded()) {
      this.notice.box.classList.add('notification--folded')
    }
  }

  expanded () {
    let panel = document.getElementById('bx-panel');

    return (!!panel) ? panel.classList.contains('bx-panel-folded') : false;
  }

  panaled () {
    let panel = document.getElementById('bx-panel');

    return !!panel;
  }
}