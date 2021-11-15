class CsManagerClient {


    static msready() {
        csManagerClient = new CsManagerClient();
    
    }

    constructor() {
        this._updatedTime = null;

        var _this = this;

        this._modelTable = new Tabulator("#modeltable", {
            layout: "fitColumns",
            responsiveLayout: "hide",
            rowClick: function(e,row) {
                _this._loadNewModel(row.getData().name);
            },
            columns: [
                { title: "", field: "image", formatter: "image", minWidth: 100, maxWidth: 100, formatterParams: { width: "90px", height: "70px" } },
                { title: "Name", field: "name", formatter: "plaintext" }
            ],
        });
        
        this._checkForNewModels();
       
    }


    async _checkForNewModels() {
        let res = await fetch(serveraddress + '/api/models');
        let data = await res.json();

        await this._updateModelList(data);

    }

    async _updateModelList(data)
    { 
        this._modelTable.clearData();
        for (var i=0;i<data.length;i++)
        { 
        
            let image = await fetch(serveraddress + '/api/png/' + data[i]);
            let imageblow = await image.blob();
            let urlCreator = window.URL || window.webkitURL;
            let part = urlCreator.createObjectURL(imageblow);                
           
            let prop = {image:part, name: data[i]};
            this._modelTable.addData([prop], false);
        }
    }

    async _loadNewModel(modelid)
    { 
        await hwv.model.clear();
        let res = await fetch(serveraddress + "/api/scs/" + modelid);
        let buffer = await res.arrayBuffer();
        let byteArray = new Uint8Array(buffer);
        hwv.model.loadSubtreeFromScsBuffer(hwv.model.getRootNode(), byteArray);
    }

}