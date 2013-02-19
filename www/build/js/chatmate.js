
var chatmate = {
    config      : {},
    init        : {},
    models      : {},
    controllers : {},
    views       : {},
    services    : {},
    utils       : {}
};

/**
 * Memoization construct for caching namespace:key->value objects.
 *
 * @constructor CacheService
 * @author Zorayr Khalapyan
 */
chatmate.utils.CacheService = (function () {
    "use strict";

    var DEFAULT_NAMESPACE = 'global';

    var cache = {};

    return function (namespace) {

        var that = {};

        that.isSet = function (key) {
            return cache[namespace][key] !== undefined;
        };

        that.set = function (key, value) {
            cache[namespace][key] = value;
        };

        that.remove = function (key) {
            if (that.isSet(key)) {
                delete cache[namespace][key];
            }
        };

        that.removeAll = function () {
            cache[namespace] = {};
        };

        //Initialize cache.
        (function () {
            if (namespace === undefined) {
                namespace = DEFAULT_NAMESPACE;
            }

            if (cache[namespace] === undefined) {
                cache[namespace] = {};
            }

        }());

        return that;
    };
}());
/**
 * The class encapsulates and facilitates device detection based on the current
 * device's user agent string.
 *
 * @class DeviceDetection
 * @author Zorayr Khalapyan
 * @version 02/08/2013
 */
chatmate.utils.DeviceDetection = (function () {
    "use strict";
    var that = {};

    var userAgent = navigator.userAgent;

    var documentURL = document.URL;

    var matchUserAgent = function (agentRegexp) {
        return userAgent.match(agentRegexp);
    };

    /**
     * Returns true if the user is on a mobile device.
     */
    that.isOnDevice = function () {
        return matchUserAgent(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    };

    /**
     * Returns true if the user is currently on an iPhone, iPod, or an iPad.
     */
    that.isDeviceiOS = function () {
        return matchUserAgent(/(iPhone|iPod|iPad)/);
    };

    /**
     * Returns true if the user is currently on an Android device.
     */
    that.isDeviceAndroid = function () {
        return matchUserAgent(/(Android)/);
    };

    /**
     * Returns true if the current application is running on a Cordova build.
     */
    that.isNativeApplication = function () {
        return documentURL.indexOf('http://') === -1 &&
            documentURL.indexOf('https://') === -1;
    };

    /**
     * The method sets the current user agent string and can be used for agent
     * spoofing or for testing.
     */
    that.setUserAgent = function (newUserAgent) {
        userAgent = newUserAgent;
    };

    /**
     * The method sets the current document URL string and can be used for
     * testing native application detection.
     */
    that.setDocumentURL = function (newDocumentURL) {
        documentURL = newDocumentURL;
    };

    return that;

}());
/**
 * The class is designed to facilitate flexible permanent storage of key value 
 * pairs utilizing HTML5 localStorage.
 *  
 * @class LocalMap
 * @author Zorayr Khalapyan
 * @version 7/30/2012
 */
chatmate.utils.LocalMap = function (name) {
    "use strict";

    var that = {};

    if (localStorage[name] === undefined) {
        localStorage[name] = JSON.stringify({});
    }

    var setMap = function (map) {
        localStorage[name] = JSON.stringify(map);
    };

    that.getMap = function () {
        return JSON.parse(localStorage[name]);
    };

    that.set = function (name, object) {
        var map = that.getMap();
        map[name] = object;
        setMap(map);
    };

    that.importMap = function (object) {
        var map = that.getMap(),
            key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                map[key] = object[key];
            }
        }
        setMap(map);
    };

    that.get = function (name) {
        var map = that.getMap();
        return map[name] !== undefined ? map[name] : null;
    };

    that.length = function () {
        var map = that.getMap(),
            size = 0,
            key;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                size += 1;
            }
        }
        return size;
    };

    that.erase = function () {
        localStorage[name] = JSON.stringify({});
    };

    that.isSet = function (name) {
        return that.get(name) !== null;
    };

    that.release = function (name) {
        var map = that.getMap();
        if (map[name]) {
            delete map[name];
        }
        setMap(map);
    };

    return that;

};

chatmate.utils.LocalMap.destroy = function () {
    "use strict";
    var item;
    for (item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            delete localStorage[item];
        }
    }
};

chatmate.utils.LocalMap.exists = function (name) {
    "use strict";
    return (localStorage[name]) ? true : false;
};


chatmate.utils.Logger = (function () {
    "use strict";

    var formatOutput = function (namespace, message) {
        return namespace + ": " + message;
    };

    var log = function (namespace, message) {
        console.log(formatOutput(namespace, message));
    };

    var debug = function (namespace, message) {
        console.debug(formatOutput(namespace, message));
    };

    var warn = function (namespace, message) {
        console.warn(formatOutput(namespace, message));
    };

    var error = function (namespace, message) {
        console.error(formatOutput(namespace, message));
    };

    var info = function (namespace, message) {
        console.info(formatOutput(namespace, message));
    };

    return function (namespace) {
        var that = {};

        that.log = function (message) {
            log(namespace, message);
        };

        that.debug = function (message) {
            debug(namespace, message);
        };

        that.warn = function (message) {
            warn(namespace, message);
        };

        that.error = function (message) {
            error(namespace, message);
        };

        that.info = function (message) {
            info(namespace, message);
        };

        return that;
    };
}());
chatmate.utils.UUIDGen = {

    generate : function () {
        "use strict";

        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [],
            hexDigits = "0123456789abcdef",
            i;

        for (i = 0; i < 36; i += 1) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        // Bits 12-15 of the time_hi_and_version field to 0010.
        s[14] = "4";

        // Bits 6-7 of the clock_seq_hi_and_reserved to 01.
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        return s.join("");
    }
};

chatmate.controllers.ChatRoomController = (function () {
    "use strict";

    return function (chatRoomModel) {

        var that = {};

        var chatRoomMessagesView = null;

        that.renderChatRoom = function () {
            var chatRoomView = chatmate.views.ChatRoomView(that);
            return chatRoomView.render();
        };

        that.renderChatRoomMessages = function () {
            chatRoomMessagesView = chatmate.views.ChatRoomMessagesView(that);
            return chatRoomMessagesView.render();
        };

        that.deleteChatRoomCallback = function () {
            chatRoomModel.deleteRoom();
            chatmate.controllers.PageController.openChatRoomsView();
        };

        that.saveChatRoomCallback = function () {
            chatmate.models.ChatRoomModelFactory.addChatRoomModel(chatRoomModel);
            chatmate.controllers.PageController.openChatRoomsView();
        };

        that.sendMessage = function (message) {
            chatmate.services.ChatService.sendMessage(chatRoomModel, message);
            that.addMessage(message);
        };

        that.addMessage = function (message) {
            if (chatRoomMessagesView !== null) {
                chatRoomMessagesView.addMessage(message);
            }
        };

        that.getChatRoomModel = function () {
            return chatRoomModel;
        };

        chatmate.services.ChatService.setOnMessageCallback(function (packet) {
            if (packet.room === chatRoomModel.getTitle()) {
                that.addMessage(packet.message);
            }
        });

        return that;

    };
}());

chatmate.controllers.ChatRoomsController = (function () {
    "use strict";

    return function () {

        var that = {};

        var chatRoomsMenuView = null;

        var openChatRoomCallback = function (title) {
            return function () {
                chatmate.controllers.PageController.openChatRoomPage({
                    title : title
                });
            };
        };

        that.addChatRoom = function (chatRoomTitle) {
            if (chatRoomsMenuView !== null) {
                chatRoomsMenuView.addItem(chatRoomTitle,  openChatRoomCallback(chatRoomTitle));
            }
        };

        that.renderChatRoomList = function () {
            var chatRooms = chatmate.models.ChatRoomModelFactory.getAllActiveChatRooms(),
                chatRoomList = [],
                title;

            for (title in chatRooms) {
                if (chatRooms.hasOwnProperty(title)) {
                    chatRoomList.push({
                        label    : title,
                        callback : openChatRoomCallback(title)
                    });
                }
            }

            chatRoomsMenuView = chatmate.views.ListView("Chat Rooms Menu", chatRoomList, "No Chat Rooms Available");
            var container = document.createElement('div');
            container.appendChild(chatRoomsMenuView.render());
            container.appendChild(mwf.decorator.SingleClickButton("Create Room", chatmate.controllers.PageController.openNewChatRoomPage));
            return container;
        };

        chatmate.services.ChatService.setOnMessageCallback(function (packet) {
            if (!chatmate.models.ChatRoomModelFactory.chatRoomExists(packet.room)) {
                that.addChatRoom(packet.room);
            }
        });

        return that;
    };
}());

chatmate.controllers.PageController = (function () {
    "use strict";
    var that = {};

    var pageHistoryStack = [];

    var pageCanvas = null;

    var logger = chatmate.utils.Logger("PageController");

    var getPageCanvas = function () {
        if (pageCanvas === null) {
            pageCanvas = document.getElementById("page-canvas");
        }
        return pageCanvas;
    };

    var displayPage = function (pageModel) {
        logger.info("Displaying page " + pageModel.getPageTitle() + ".");
        var pageView = chatmate.models.PageView(pageModel);
        var canvas = getPageCanvas();
        canvas.innerHTML = "";
        canvas.appendChild(pageView.render());
    };

    that.register = function (pageName, initializer) {
        that["open" + pageName] = initializer;
    };

    that.render = function (pageModel) {
        logger.info("Adding page model " + pageModel.getPageTitle() + " to history stack.");
        pageHistoryStack.push(pageModel);
        displayPage(pageModel);
    };

    that.canGoBack = function () {
        return pageHistoryStack.length > 1;
    };

    that.goBack = function () {
        pageHistoryStack.pop();
        logger.info("goBack() invoked.");
        displayPage(pageHistoryStack[pageHistoryStack.length - 1]);
    };

    return that;

}());

chatmate.init.ChatRoomMessages = (function () {
    "use strict";
    return function (params) {
        var page = chatmate.models.PageModel("Chat Room Messages");
        var chatRoomModel = chatmate.models.ChatRoomModelFactory.getChatRoomModel(params.title);
        var chatRoomController = chatmate.controllers.ChatRoomController(chatRoomModel);
        page.setTopButton("Chat Rooms", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent(chatRoomController.renderChatRoomMessages());
        chatmate.controllers.PageController.render(page);
    };
}());

chatmate.init.ChatRooms = (function () {
    "use strict";
    return function () {
        var chatRoomsController = chatmate.controllers.ChatRoomsController();
        var page = chatmate.models.PageModel("Chat Rooms");
        page.setTopButton("Refresh", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent(chatRoomsController.renderChatRoomList());
        chatmate.controllers.PageController.render(page);
    };
}());

chatmate.init.NewChatRoom = (function () {
    "use strict";
    return function () {
        var newChatRoomModel = chatmate.models.ChatRoomModel("");
        var chatRoomController = chatmate.controllers.ChatRoomController(newChatRoomModel);
        var page = chatmate.models.PageModel("Create New Chat Room");
        page.setTopButton("Chat Rooms", chatmate.controllers.PageController.openChatRoomsView);
        page.setPageContent(chatRoomController.renderChatRoom());
        chatmate.controllers.PageController.render(page);
    };
}());

$(document).ready(function () {
    "use strict";

    var logger = chatmate.utils.Logger();

    chatmate.services.ChatServiceInitializer();

    // Page initializer for the home icon.
    chatmate.controllers.PageController.register("HomePage",  chatmate.init.ChatRooms);

    chatmate.controllers.PageController.register("NewChatRoomPage",  chatmate.init.NewChatRoom);
    chatmate.controllers.PageController.register("ChatRoomsView",    chatmate.init.ChatRooms);
    chatmate.controllers.PageController.register("ChatRoomPage",     chatmate.init.ChatRoomMessages);
    chatmate.controllers.PageController.register("NewChatRoomPage",  chatmate.init.NewChatRoom);

    chatmate.models.ChatRoomModelFactory.getChatRoomModel("OPT Tech Talk");
    chatmate.models.ChatRoomModelFactory.getChatRoomModel("MWF Friends");

    chatmate.controllers.PageController.openChatRoomsView();

    if (chatmate.utils.DeviceDetection.isDeviceAndroid()) {

        var androidBackButtonCallback = function () {
            if (chatmate.controllers.PageController.canGoBack()) {
                logger.info("Go back invoked!");
                chatmate.controllers.PageController.goBack();
            } else {
                navigator.app.exitApp();
            }
        };

        var setBackButtonHandling = function () {
            document.addEventListener("backbutton", androidBackButtonCallback, true);
        };

        document.addEventListener("deviceready", setBackButtonHandling, false);
    } else {
        // Init chat service.
        chatmate.services.ChatService.run();

    }
});

chatmate.models.ChatRoomModel = (function () {
    "use strict";

    return function (title) {

        var that = {};

        var messages = [];

        var deleted = false;

        that.getTitle = function () {
            return title;
        };

        that.setTitle = function (newTitle) {
            title = newTitle;
        };

        that.addMessage = function (message) {
            messages.push(message);
        };

        that.getMessages = function () {
            return messages;
        };

        that.isDeleted = function () {
            return deleted;
        };

        that.deleteRoom = function () {
            deleted = true;
        };

        return that;
    };

}());

chatmate.models.ChatRoomModelFactory = (function () {
    "use strict";
    var that = {};

    var chatRoomModels = {};

    that.addChatRoomModel = function (chatRoomModel) {
        chatRoomModels[chatRoomModel.getTitle()] = chatRoomModel;
    };

    that.chatRoomExists = function (title) {
        return chatRoomModels[title] !== undefined;
    };

    that.getChatRoomModel = function (title) {
        if (!that.chatRoomExists(title)) {
            that.addChatRoomModel(chatmate.models.ChatRoomModel(title));
        }
        return chatRoomModels[title];
    };

    that.getAllActiveChatRooms = function () {
        var activeChatRooms = {},
            title;
        for (title in chatRoomModels) {
            if (chatRoomModels.hasOwnProperty(title)) {
                if (!chatRoomModels[title].isDeleted()) {
                    activeChatRooms[title] = chatRoomModels[title];
                }
            }
        }
        return activeChatRooms;
    };

    return that;

}());

chatmate.models.PageModel = (function () {
    "use strict";
    return function (pageTitle, pageParams) {

        var that = {};

        var pageContent;

        var topButtonCallback;

        var topButtonLabel;

        that.setPageContent = function (newPageContent) {
            pageContent = newPageContent;
        };

        that.getContent = function () {
            return pageContent;
        };

        that.setPageTitle = function (newPageTitle) {
            pageTitle = newPageTitle;
        };

        that.getPageTitle = function () {
            return pageTitle;
        };

        that.setPageParams = function (newPageParams) {
            pageParams = newPageParams;
        };

        that.getPageParams = function () {
            return pageParams;
        };

        that.setTopButton = function (newTopButtonLabel, newTopButtonCallback) {
            topButtonLabel    = newTopButtonLabel;
            topButtonCallback = newTopButtonCallback;
        };

        that.getTopButtonLabel = function () {
            return topButtonLabel;
        };

        that.getTopButtonCallback = function () {
            return topButtonCallback;
        };

        return that;
    };
}());

/*global WebSocket: false */

chatmate.services.ChatServiceInitializer = function () {
    "use strict";

    chatmate.services.ChatService = (function () {
        var that = {};

        var serviceURL = "ws://localhost:3000";
        var logger = chatmate.utils.Logger("chatmate.services.ChatService");
        var messageQueue = [];
        var socket = null;
        var onMessageCallback;
        var isSocketOpen = false;

        var onOpenHandler = function (e) {
            logger.info("Opened connection.");
            socket.binaryType = "arraybuffer";
            isSocketOpen = true;
        };

        var onMessageHandler = function (e) {
            var packet = $.parseJSON(e.data);
            logger.info("Received message: " + e.data);

            var chatRoomModel = chatmate.models.ChatRoomModelFactory.getChatRoomModel(packet.room);
            chatRoomModel.addMessage(packet.message);

            if (typeof onMessageCallback === "function") {
                onMessageCallback(packet);
            }
        };

        var onCloseHandler = function (e) {
            isSocketOpen = false;
        };

        that.setOnMessageCallback = function (newOnMessageCallback) {
            onMessageCallback = newOnMessageCallback;
        };

        that.run = function () {
            if (socket === null) {
                logger.info("Starting WebSocket.");
                socket = new WebSocket(serviceURL);
            }

            socket.onerror = function (e) {
                logger.error("Error occurred with the socket.");
                logger.error(e);
            };

            socket.onmessage = onMessageHandler;
            socket.onopen    = onOpenHandler;
            socket.onclose   = onCloseHandler;
        };

        that.sendMessage = function (chatRoomModel, message) {
            chatRoomModel.addMessage(message);
            var packet = {
                room    : chatRoomModel.getTitle(),
                message : message
            };
            if (isSocketOpen) {
                logger.info("Sent message: ", packet);
                socket.send(JSON.stringify(packet));
            } else {
                messageQueue.push(message);
            }
        };

        return that;

    }());
};
/**
 * Memoization construct for caching namespace:key->value objects.
 *
 * @constructor CacheService
 * @author Zorayr Khalapyan
 */
chatmate.utils.CacheService = (function () {
    "use strict";

    var DEFAULT_NAMESPACE = 'global';

    var cache = {};

    return function (namespace) {

        var that = {};

        that.isSet = function (key) {
            return cache[namespace][key] !== undefined;
        };

        that.set = function (key, value) {
            cache[namespace][key] = value;
        };

        that.remove = function (key) {
            if (that.isSet(key)) {
                delete cache[namespace][key];
            }
        };

        that.removeAll = function () {
            cache[namespace] = {};
        };

        //Initialize cache.
        (function () {
            if (namespace === undefined) {
                namespace = DEFAULT_NAMESPACE;
            }

            if (cache[namespace] === undefined) {
                cache[namespace] = {};
            }

        }());

        return that;
    };
}());
/**
 * The class encapsulates and facilitates device detection based on the current
 * device's user agent string.
 *
 * @class DeviceDetection
 * @author Zorayr Khalapyan
 * @version 02/08/2013
 */
chatmate.utils.DeviceDetection = (function () {
    "use strict";
    var that = {};

    var userAgent = navigator.userAgent;

    var documentURL = document.URL;

    var matchUserAgent = function (agentRegexp) {
        return userAgent.match(agentRegexp);
    };

    /**
     * Returns true if the user is on a mobile device.
     */
    that.isOnDevice = function () {
        return matchUserAgent(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    };

    /**
     * Returns true if the user is currently on an iPhone, iPod, or an iPad.
     */
    that.isDeviceiOS = function () {
        return matchUserAgent(/(iPhone|iPod|iPad)/);
    };

    /**
     * Returns true if the user is currently on an Android device.
     */
    that.isDeviceAndroid = function () {
        return matchUserAgent(/(Android)/);
    };

    /**
     * Returns true if the current application is running on a Cordova build.
     */
    that.isNativeApplication = function () {
        return documentURL.indexOf('http://') === -1 &&
            documentURL.indexOf('https://') === -1;
    };

    /**
     * The method sets the current user agent string and can be used for agent
     * spoofing or for testing.
     */
    that.setUserAgent = function (newUserAgent) {
        userAgent = newUserAgent;
    };

    /**
     * The method sets the current document URL string and can be used for
     * testing native application detection.
     */
    that.setDocumentURL = function (newDocumentURL) {
        documentURL = newDocumentURL;
    };

    return that;

}());
/**
 * The class is designed to facilitate flexible permanent storage of key value 
 * pairs utilizing HTML5 localStorage.
 *  
 * @class LocalMap
 * @author Zorayr Khalapyan
 * @version 7/30/2012
 */
chatmate.utils.LocalMap = function (name) {
    "use strict";

    var that = {};

    if (localStorage[name] === undefined) {
        localStorage[name] = JSON.stringify({});
    }

    var setMap = function (map) {
        localStorage[name] = JSON.stringify(map);
    };

    that.getMap = function () {
        return JSON.parse(localStorage[name]);
    };

    that.set = function (name, object) {
        var map = that.getMap();
        map[name] = object;
        setMap(map);
    };

    that.importMap = function (object) {
        var map = that.getMap(),
            key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                map[key] = object[key];
            }
        }
        setMap(map);
    };

    that.get = function (name) {
        var map = that.getMap();
        return map[name] !== undefined ? map[name] : null;
    };

    that.length = function () {
        var map = that.getMap(),
            size = 0,
            key;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                size += 1;
            }
        }
        return size;
    };

    that.erase = function () {
        localStorage[name] = JSON.stringify({});
    };

    that.isSet = function (name) {
        return that.get(name) !== null;
    };

    that.release = function (name) {
        var map = that.getMap();
        if (map[name]) {
            delete map[name];
        }
        setMap(map);
    };

    return that;

};

chatmate.utils.LocalMap.destroy = function () {
    "use strict";
    var item;
    for (item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
            delete localStorage[item];
        }
    }
};

chatmate.utils.LocalMap.exists = function (name) {
    "use strict";
    return (localStorage[name]) ? true : false;
};


chatmate.utils.Logger = (function () {
    "use strict";

    var formatOutput = function (namespace, message) {
        return namespace + ": " + message;
    };

    var log = function (namespace, message) {
        console.log(formatOutput(namespace, message));
    };

    var debug = function (namespace, message) {
        console.debug(formatOutput(namespace, message));
    };

    var warn = function (namespace, message) {
        console.warn(formatOutput(namespace, message));
    };

    var error = function (namespace, message) {
        console.error(formatOutput(namespace, message));
    };

    var info = function (namespace, message) {
        console.info(formatOutput(namespace, message));
    };

    return function (namespace) {
        var that = {};

        that.log = function (message) {
            log(namespace, message);
        };

        that.debug = function (message) {
            debug(namespace, message);
        };

        that.warn = function (message) {
            warn(namespace, message);
        };

        that.error = function (message) {
            error(namespace, message);
        };

        that.info = function (message) {
            info(namespace, message);
        };

        return that;
    };
}());
chatmate.utils.UUIDGen = {

    generate : function () {
        "use strict";

        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [],
            hexDigits = "0123456789abcdef",
            i;

        for (i = 0; i < 36; i += 1) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        // Bits 12-15 of the time_hi_and_version field to 0010.
        s[14] = "4";

        // Bits 6-7 of the clock_seq_hi_and_reserved to 01.
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";

        return s.join("");
    }
};

chatmate.views.ChatRoomMessagesView = (function () {
    "use strict";
    return function (chatRoomController) {
        var that = {};

        var chatRoomModel = chatRoomController.getChatRoomModel();

        var messagesMenu;

        var noMessagesAvailable = false;

        var addMessage = function (message) {
            messagesMenu.addMenuLinkItem(message.username, null, message.text);
        };

        that.render = function () {
            messagesMenu = mwf.decorator.Menu(chatRoomModel.getTitle());
            var messages = chatRoomModel.getMessages(),
                i;
            if (messages.length === 0) {
                messagesMenu.addMenuLinkItem("No Messages Available");
                noMessagesAvailable = true;
            } else {
                for (i = 0; i < messages.length; i += 1) {
                    addMessage(messages[i]);
                }
            }
            var container = document.createElement('div');
            container.appendChild(messagesMenu);
            container.appendChild(chatmate.views.NewChatRoomMessageView(chatRoomController).render());
            container.appendChild(mwf.decorator.SingleClickButton("Delete Room", chatRoomController.deleteChatRoomCallback));
            return container;
        };

        that.addMessage = function (message) {
            if (noMessagesAvailable) {
                messagesMenu.removeMenuItemAt(0);
                noMessagesAvailable = false;
            }
            addMessage(message);
        };

        return that;
    };

}());

chatmate.views.ChatRoomView = (function () {
    "use strict";
    return function (chatRoomController) {

        var that = {};

        var chatRoomModel = chatRoomController.getChatRoomModel();

        var saveChatRoomCallback = function () {

            var newTitle = document.getElementById("chat-room-title-input").value;
            if (newTitle.length === 0) {
                alert("Sorry, no invalid titles.");
            } else if (chatmate.models.ChatRoomModelFactory.chatRoomExists(newTitle)) {
                alert("Sorry, no duplicate chat room title.");
            } else {
                chatRoomModel.setTitle(newTitle);
                chatRoomController.saveChatRoomCallback();
            }
        };


        that.render = function () {

            var chatRoomFormView = mwf.decorator.Form("Chat Room Information");
            chatRoomFormView.addLabel("Title", "chat-room-title-input");
            var inputBox = chatRoomFormView.addTextBox("chat-room-title-input", "chat-room-title-input");
            inputBox.value = chatRoomModel.getTitle();

            $(chatRoomFormView).submit(function (e) {
                e.preventDefault();
                saveChatRoomCallback();
            });

            var container = document.createElement('div');
            container.appendChild(chatRoomFormView);
            container.appendChild(mwf.decorator.DoubleClickButton("Cancel", chatmate.controllers.PageController.openChatRoomsView, "Save", saveChatRoomCallback));
            return container;
        };

        return that;
    };

}());

chatmate.views.ListView = (function () {
    "use strict";
    return function (title, list, emptyListMessage) {

        var that = {};

        var menu = null;

        var isEmptyList = false;

        that.addItem = function (label, callback) {
            if (menu !== null) {
                if (isEmptyList) {
                    menu.removeMenuItemAt(0);
                    isEmptyList = false;
                }
                var menuItem = menu.addMenuLinkItem(label);

                if (callback !== undefined) {
                    mwf.decorator.TouchEnabledItemModel.bindTouchEvent(menuItem, menuItem, callback, "menu-highlight");
                }
            }
        };

        that.render = function () {
            menu = mwf.decorator.Menu(title);

            if (list.length === 0) {
                menu.addMenuLinkItem(emptyListMessage);
                isEmptyList = true;

            } else {
                var i;
                for (i = 0; i < list.length; i += 1) {
                    that.addItem(list[i].label, list[i].callback);
                }
            }

            return menu;
        };

        return that;

    };

}());

chatmate.views.NewChatRoomMessageView = (function () {
    "use strict";
    return function (chatRoomController) {

        var that = {};

        var user = chatmate.utils.LocalMap("user");

        var hideKeyboard = function () {
            document.activeElement.blur();
            $("input").blur();
        };

        var sendMessage = function () {
            var username = document.getElementById("username").value;
            var message = document.getElementById("new-message").value;
            if (username.length === 0) {
                alert("Please enter your username.");
            } else if (message.length === 0) {
                alert("Sorry, no empty messages can be sent.");
            } else {
                chatRoomController.sendMessage({
                    text     : message,
                    username : username
                });
                user.set("username", username);
                document.getElementById("new-message").value = "";
                hideKeyboard();
            }
        };

        that.render = function () {

            var form = mwf.decorator.Form("New Message");
            form.addLabel("Username", "username");
            form.addTextBox("username", "username", user.get("username"));
            form.addLabel("Your Message");
            form.addTextBox("New Message", "new-message");
            form.addSubmitButton("Send Away");

            $(form).submit(function (e) {
                e.preventDefault();
                sendMessage();
            });

            return form;
        };

        return that;

    };

}());

chatmate.models.PageView = (function () {
    "use strict";
    return function (pageModel) {
        var that = {};
        that.render = function () {
            document.getElementById("header-title").innerHTML = pageModel.getPageTitle();
            mwf.decorator.TopButton(pageModel.getTopButtonLabel(), null, pageModel.getTopButtonCallback(), true);
            var headerLink = document.getElementById("header-link");
            mwf.decorator.TouchEnabledItemModel.bindTouchEvent(headerLink, headerLink, chatmate.controllers.PageController.openHomePage);
            return pageModel.getContent();
        };
        return that;
    };
}());
