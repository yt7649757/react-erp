import storage from './storage';

function CreateTab(url, obj) {
    this.url = url;
    this.obj = obj;
    this.r = storage.get('routes');
    CreateTab.prototype.create = function () {
        if (JSON.stringify(this.r).indexOf(this.obj.guid) === -1) {
            this.r.push(obj)
        } else {
            const _this = this;
            this.r.map(item => {
                if (item.guid === _this.obj.guid) {
                    item.menu_name = _this.obj.menu_name;
                    item.url = _this.url;
                    if(item.content) {
                        item.content = _this.obj.content;
                    }
                }
            })
        }
        storage.set('routes', this.r);
        sessionStorage.setItem('current', this.url);
    }
}

export default CreateTab