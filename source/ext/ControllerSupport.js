//*@public
/**
*/
enyo.kind({
    
    // ...........................
    // PUBLIC PROPERTIES
    
    //*@public
    name: "enyo.ControllerSupport",
    
    //*@public
    kind: "enyo.Mixin",
    
	//*@public
	/**
        It is important for bindings _not_ to be initialized until
        after components/children have been fully created and initialized.
	*/
    
    // ...........................
    // PROTECTED PROPERTIES
    
    // ...........................
    // COMPUTED PROPERTIES
    
    // ...........................
    // PUBLIC METHODS
    
    // ...........................
    // PROTECTED METHODS
    
    //*@protected
    create: function () {
        // need to ensure we re-evaluate our observers so notifications
        // will be able to respond as expected
        this.initObservers = true;
        this.setup();
        this.notifyObservers("controller");
    },
    
    //*protected
    destroy: function () {
	    if (this.controller) {
	        if (this.controller.owner && this === this.controller.owner) {
	            this.controller.destroy();
	        }
	        this.controller = null;
        }
        this.inherited(arguments);
    },
    
	//*@protected
	_cs_controller_changed: enyo.Observer(function () {
	    // first attempt to find the controller from the
	    // information we've been handed
        this.findAndInstance("controller");
	}, "controller"),
    
    //*@protected
    controllerFindAndInstance: function (ctor, inst) {
        // if there is no constructor or instance it was not found
        if (!(ctor || inst)) return;
        // if a constructor exists we instanced the class and can
        // claim it as our own
        if (ctor) inst.set("owner", this);
        // lets add ourselves as a dispatch listener
        else inst.addDispatchTarget(this);
        // either way we need to refresh our bindings
        this.refreshBindings();   
    },
    
    //*@protected
    dispatchEvent: function (name, event, sender) {
	    // if we have a controller attempt to dispatch the event there
	    // and if it returns true, stop the dispatch
	    if (this.controller && this.controller.dispatchEvent(name, event, sender)) {
	        return true;
	    }
        
        return this.inherited(arguments);
    },
    
	//*@protected
	dispatch: function (inMethodName, inEvent, inSender) {
	    // allow a controller to handle the delegated named event from
	    // a child
	    var c = this.controller;
        if (c) {
            if (c[inMethodName] && enyo.isFunction(c[inMethodName]))
            return c[inMethodName].call(c, inSender || this, inEvent);
        }
        return this.inherited(arguments);
	}
    
    // ...........................
    // OBSERVERS

});