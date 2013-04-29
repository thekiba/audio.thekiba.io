if (typeof windows.audio == 'undefined') {
    windows.audio = {};
}

windows.audio.get_all_audio = function (callback) {
    var data = {uid: 12};

    VK.api('audio.get', data, function (result) {
        if(result.response) {
            if (typeof callback == 'function') {
                callback(result.response);
            }
        }
        console.log('error');
        return false;
    });
};

windows.audio.sort_audio = function (items) {
    for (var key in items) {
        var value = items[key];
    }
};

windows.audio.clone = function (items) {
    var items_clone = {};
    return items_clone;
};

windows.audio.reorder = function (reorders, callback) {
    for (var key in reorders) {
        var reorder = reorders[key];
    }
    if (typeof callback == 'function') {
        callback();
    }
}