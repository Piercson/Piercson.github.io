// Code Modified From https://dev.to/sandeshsapkota/creating-an-bubble-animation-with-javascript-na
const root = document.querySelector("#app");
let { innerHeight, innerWidth } = window;
if (innerHeight < 300) {
  innerHeight = 350;
}
if (innerWidth < 300) {
  innerWidth = 750;
}
// Ready from https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery
var ready = (function(){

    var readyList,
        DOMContentLoaded,
        class2type = {};
        class2type["[object Boolean]"] = "boolean";
        class2type["[object Number]"] = "number";
        class2type["[object String]"] = "string";
        class2type["[object Function]"] = "function";
        class2type["[object Array]"] = "array";
        class2type["[object Date]"] = "date";
        class2type["[object RegExp]"] = "regexp";
        class2type["[object Object]"] = "object";

    var ReadyObj = {
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,
        // Hold (or release) the ready event
        holdReady: function( hold ) {
            if ( hold ) {
                ReadyObj.readyWait++;
            } else {
                ReadyObj.ready( true );
            }
        },
        // Handle when the DOM is ready
        ready: function( wait ) {
            // Either a released hold or an DOMready/load event and not yet ready
            if ( (wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady) ) {
                // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                if ( !document.body ) {
                    return setTimeout( ReadyObj.ready, 1 );
                }

                // Remember that the DOM is ready
                ReadyObj.isReady = true;
                // If a normal DOM Ready event fired, decrement, and wait if need be
                if ( wait !== true && --ReadyObj.readyWait > 0 ) {
                    return;
                }
                // If there are functions bound, to execute
                readyList.resolveWith( document, [ ReadyObj ] );

                // Trigger any bound ready events
                //if ( ReadyObj.fn.trigger ) {
                //    ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                //}
            }
        },
        bindReady: function() {
            if ( readyList ) {
                return;
            }
            readyList = ReadyObj._Deferred();

            // Catch cases where $(document).ready() is called after the
            // browser event has already occurred.
            if ( document.readyState === "complete" ) {
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                return setTimeout( ReadyObj.ready, 1 );
            }

            // Mozilla, Opera and webkit nightlies currently support this event
            if ( document.addEventListener ) {
                // Use the handy event callback
                document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                // A fallback to window.onload, that will always work
                window.addEventListener( "load", ReadyObj.ready, false );

            // If IE event model is used
            } else if ( document.attachEvent ) {
                // ensure firing before onload,
                // maybe late but safe also for iframes
                document.attachEvent( "onreadystatechange", DOMContentLoaded );

                // A fallback to window.onload, that will always work
                window.attachEvent( "onload", ReadyObj.ready );

                // If IE and not a frame
                // continually check to see if the document is ready
                var toplevel = false;

                try {
                    toplevel = window.frameElement == null;
                } catch(e) {}

                if ( document.documentElement.doScroll && toplevel ) {
                    doScrollCheck();
                }
            }
        },
        _Deferred: function() {
            var // callbacks list
                callbacks = [],
                // stored [ context , args ]
                fired,
                // to avoid firing when already doing so
                firing,
                // flag to know if the deferred has been cancelled
                cancelled,
                // the deferred itself
                deferred  = {

                    // done( f1, f2, ...)
                    done: function() {
                        if ( !cancelled ) {
                            var args = arguments,
                                i,
                                length,
                                elem,
                                type,
                                _fired;
                            if ( fired ) {
                                _fired = fired;
                                fired = 0;
                            }
                            for ( i = 0, length = args.length; i < length; i++ ) {
                                elem = args[ i ];
                                type = ReadyObj.type( elem );
                                if ( type === "array" ) {
                                    deferred.done.apply( deferred, elem );
                                } else if ( type === "function" ) {
                                    callbacks.push( elem );
                                }
                            }
                            if ( _fired ) {
                                deferred.resolveWith( _fired[ 0 ], _fired[ 1 ] );
                            }
                        }
                        return this;
                    },

                    // resolve with given context and args
                    resolveWith: function( context, args ) {
                        if ( !cancelled && !fired && !firing ) {
                            // make sure args are available (#8421)
                            args = args || [];
                            firing = 1;
                            try {
                                while( callbacks[ 0 ] ) {
                                    callbacks.shift().apply( context, args );//shifts a callback, and applies it to document
                                }
                            }
                            finally {
                                fired = [ context, args ];
                                firing = 0;
                            }
                        }
                        return this;
                    },

                    // resolve with this as context and given arguments
                    resolve: function() {
                        deferred.resolveWith( this, arguments );
                        return this;
                    },

                    // Has this deferred been resolved?
                    isResolved: function() {
                        return !!( firing || fired );
                    },

                    // Cancel
                    cancel: function() {
                        cancelled = 1;
                        callbacks = [];
                        return this;
                    }
                };

            return deferred;
        },
        type: function( obj ) {
            return obj == null ?
                String( obj ) :
                class2type[ Object.prototype.toString.call(obj) ] || "object";
        }
    }
    // The DOM ready check for Internet Explorer
    function doScrollCheck() {
        if ( ReadyObj.isReady ) {
            return;
        }

        try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
        } catch(e) {
            setTimeout( doScrollCheck, 1 );
            return;
        }

        // and execute any waiting functions
        ReadyObj.ready();
    }
    // Cleanup functions for the document ready method
    if ( document.addEventListener ) {
        DOMContentLoaded = function() {
            document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
            ReadyObj.ready();
        };

    } else if ( document.attachEvent ) {
        DOMContentLoaded = function() {
            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( document.readyState === "complete" ) {
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
                ReadyObj.ready();
            }
        };
    }
    function ready( fn ) {
        // Attach the listeners
        ReadyObj.bindReady();

        var type = ReadyObj.type( fn );

        // Add the callback
        readyList.done( fn );//readyList is result of _Deferred()
    }
    return ready;
})();
// Ready

// creating many bubble instance
ready(function() {
  // If not mobile, Make bubbles!
  if (innerWidth > 479) {
      var bubbleInterval = setInterval(function () {
        // var rnd = Math.floor(Math.random() * 2);
        // if(rnd == 1){
          requestAnimationFrame(() => new Bubble());
        // }
      }, 1000);
      var n_vis_changes = 0;
      document.addEventListener("visibilitychange", function(){
        if(n_vis_changes % 2 == 0){
          clearInterval(bubbleInterval);
        }else{
          bubbleInterval = setInterval(function () {
            // var rnd = Math.floor(Math.random() * 2);
            // if(rnd == 1){
              requestAnimationFrame(() => new Bubble());
            // }
          }, 1000);
        }
        n_vis_changes += 1;
      });
  }
});
// Adjust bubble canvas when scrolling
var ticking = false;
document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      innerHeight = window.innerHeight;
      innerWidth = window.innerWidth;
      var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
      if(top >= min_y){
        min_y = top;
        max_y = top + innerHeight;
      }else{
        min_y = document.getElementById("navbar").offsetHeight;
        max_y = innerHeight;
      }
      ticking = false;
    });

    ticking = true;
  }
});
// Bubble Canvas info
var min_x = 30;
var max_x = innerWidth * 0.225;
var min_y = document.getElementById("navbar").offsetHeight;
var max_y = innerHeight - 100;
var bubble_id = 0;
const offset = 50;
window.addEventListener('resize', function() {
  var n_innerWidth = window.innerWidth
  max_x = n_innerWidth * 0.225;
  min_y = document.getElementById("navbar").offsetHeight;
});
class Bubble {
  constructor() {
    this.bubbleSpan = undefined;
    this.handleNewBubble();
    this.color = `rgba(
        ${220},
        ${225},
        ${228},
        ${Math.random()})`;
    this.gonna_pop = false;
    // setting height and width of the bubble
    this.height = this.randomNumber(80, 20);
    this.width = this.height;

    this.posY = this.randomNumber(max_y, min_y + 400);
    this.posX = this.randomNumber(max_x - this.height, min_x);

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";
    this.id = bubble_id++;
    // this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(5000, 3000));
  }

  // creates and appends a new bubble in the DOM
  handleNewBubble() {
    this.bubbleSpan = document.createElement("span");
    this.bubbleSpan.classList.add("bubble");
    root.append(this.bubbleSpan);
    this.handlePosition();
    this.bubbleSpan.addEventListener("click", this.bubbleEnd);
  }

  handlePosition() {
    // positioning the bubble in different random X and Y
    var min_height = this.posY - 30;
    if(min_height <= min_y){
      min_height = min_y;
      if(!this.gonna_pop){
        this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(5000, 3000));
        this.gonna_pop = true;
      }
    }
    // var random_y = this.randomNumber(this.posY, min_height);
    var random_y = min_height;
    var random_x;
    // Direction of Bubble
    if(this.id % 3 == 0){
      // Right
      var min_cord = this.posX - offset;
      random_x = this.randomNumber(max_x - this.height, this.posX - offset);
    }else if (this.id % 3 == 1) {
      // Left
      random_x = this.randomNumber(this.posX + offset, min_x);
    }else{
      random_x = this.randomNumber(max_x - this.height, min_x);
    }
    this.bubbleSpan.style.backgroundColor = this.color;
    this.bubbleSpan.style.height = this.height + "px";
    this.bubbleSpan.style.width = this.height + "px";

    this.posY = random_y;
    this.posX = random_x;

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";

    const randomSec = this.randomNumber(1000, 200);
    setTimeout(this.handlePosition.bind(this), randomSec); // calling for re-position of bubble
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  bubbleEnd(removingTime = 0) {
    setTimeout(
      () => {
        requestAnimationFrame(() => this.classList.add("bubble--bust"));
      },
      removingTime === 0 ? removingTime : removingTime - 100
    );

    setTimeout(() => {
      requestAnimationFrame(() => this.remove());
      if(Math.floor(Math.random() * 4) == 1){
        new Bubble();
      }
    }, removingTime);
  }
}
