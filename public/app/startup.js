let csManagerClient;
const serveraddress = window.location.origin;

function setupTutorial() {


    hwv.setCallbacks({
        modelStructureReady: CsManagerClient.msready
    });

}