const serveraddress = window.location.origin;

function setupTutorial() {


    hwv.setCallbacks({
        modelStructureReady: ModelFileManager.msready
    });

    
    db = new Dexie("modeldatabase");
    db.version(1).stores({
        models: 'name,scsdata,pngdata'
    });

}