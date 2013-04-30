if (typeof window.audio == 'undefined') {
    window.audio = {};
}

window.audio.get_all_audio = function (id, callback) {
    var data = {uid: id};

    VK.api('audio.get', data, function (result) {
        if (result.response) {
            if (typeof callback == 'function') {
                callback(result.response);
                return true;
            }
            else {
                callback(result);
                return false;
            }
        }
        return false;
    });
};

window.audio.sort_audio = function (items, field_1, field_2) {
    var jump = items.length;
    var swapped = true;

    while(jump > 1 || swapped)
    {
        if(jump > 1)
        {
            jump = Math.floor(jump/1.24733);
        }
        swapped = false;
        for(var i = 0; i + jump < items.length; i++)
        {
            if(items[i][field_1] > items[i+jump][field_1]) // сторона сортировки
            {
                var temp = items[i];
                items[i] = items[i+jump];
                items[i+jump] = temp;
                swapped = true;
            }
        }
    }

    var count = 0;
    var offset = 0;

    for(var key = 0; key < items.length; key++)
    {
        if(typeof items[key+1] == 'undefined')
        {
            break;
        }

        var item_current = items[key];
        var item_next = items[key+1];

        if(item_current[field_1] == item_next[field_1])
        {
            count++;
        } else
        {
            var jump = count;
            var swapped = true;

            while(jump > 1 || swapped)
            {
                if(jump > 1)
                {
                    jump = Math.floor(jump/1.24733);
                }
                swapped = false;
                for(var i = offset; i + jump < count + offset; i++)
                {
                    if(items[i][field_2] > items[i+jump][field_2]) // сторона сортировки
                    {
                        var temp = items[i];
                        items[i] = items[i+jump];
                        items[i+jump] = temp;
                        swapped = true;
                    }
                }
            }
            offset = key+1;
            count = 1;
        }
    }
    if(count > 1)
    {
        var jump = count;
        var swapped = true;

        while(jump > 1 || swapped)
        {
            if(jump > 1)
            {
                jump = Math.floor(jump/1.24733);
            }
            swapped = false;
            for(var i = offset; i + jump < count + offset; i++)
            {
                if(items[i][field_2] > items[i+jump][field_2]) // сторона сортировки
                {
                    var temp = items[i];
                    items[i] = items[i+jump];
                    items[i+jump] = temp;
                    swapped = true;
                }
            }
        }
    }

    return items;
};

window.audio.clone = function (items) {
    var items_clone = [];
    for(var key in items)
    {
        items_clone[key] = items[key];
    }
    return items_clone;
};

window.audio.reorder = function (reorders, count, all, callback) {
    setTimeout(function(){
        VK.api('audio.reorder', reorders[count],function(){
            count++;
            if(count < all) {
                audio.reorder(reorders, count, all, callback);
            } else {
                if (typeof callback == 'function') {
                    callback();
                }
            }
        });
    }, 500);
}

window.audio.show = function(items)
{
    for(var key in items)
    {
        var item = items[key];

        console.log(item['artist'] + ' - ' + item['title']);
    }
}