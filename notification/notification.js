class Notice {
  constructor (message, type = 'success') {
    this.message = message;
    this.type = type;
    this.box = document.createElement('div');
  }

  show () {
    this.box.classList.add('notification', 'notification--' + this.type);
    document.body.insertBefore(this.box, document.body.firstChild);
    this.box.innerHTML = this.message;
    setTimeout(() => {
      this.box.classList.add('notification--visible');
    }, 10);
    this.remove();
  }

  success() {
    this.type = 'success';
    this.show();
  }

  error() {
    this.type = 'error';
    this.show();
  }

  remove () {
    setTimeout(() => {
      this.box.classList.remove('notification--visible');
    }, 2300);
  }
}

class BXNoticeDecorator {
  constructor (notice){
    this.notice = notice;
  }

  show() {
    this.notice.show();
    this.additional();
  }

  success() {
    this.notice.success();
    this.additional();
  }

  error() {
    this.notice.error();
    this.additional();
  }

  additional(){
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