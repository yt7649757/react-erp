var storage = {

    //存储
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    //取出数据
    get(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    // 删除数据
    remove(key) {
        localStorage.removeItem(key);
    }

}

// 暴露给外部访问
export default storage;
