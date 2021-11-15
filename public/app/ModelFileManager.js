var modelFileManager = null;

class ModelFileManager {

    static msready() {
        modelFileManager = new ModelFileManager();    
    }

    constructor() {

        let _this = this;

        this._modelTable = new Tabulator("#modeltable", {
            layout: "fitColumns",
            responsiveLayout: "hide",
            rowClick: function(e,row) {
                _this._loadNewModel(row.getData().id);
            },
            columns: [
                { title: "", field: "image", formatter: "image", minWidth: 100, maxWidth: 100, formatterParams: { width: "90px", height: "70px" } },
                { title: "Name", field: "id", formatter: "plaintext" },
                {
                    title: "Offline", field: "offline", maxWidth: 80, formatter: "tickCross", formatterParams: {
                        allowEmpty: true,
                        allowTruthy: true,
                    }
                },
            ],
        });
        
        this._getModelList();       
    }


    async _getModelList() {
        let res = await fetch(serveraddress + '/api/models');
        let data = await res.json();

        await this._updateModelTable(data);

    }

    async _updateModelTable(modelnames)
    { 
        this._modelTable.clearData();
        let urlCreator = window.URL || window.webkitURL;
        for (let i=0;i<modelnames.length;i++)
        { 
        
            let res = await db.models.get(modelnames[i]);
            let imageblob;
            if (!res) {
                let imagedata = await fetch(serveraddress + '/api/png/' + modelnames[i]);    
                imageblob = await imagedata.blob();
                await db.models.put({name:modelnames[i],pngdata:imageblob});
            }
            else
            { 
                imageblob = res.pngdata;
            }
            let imageurl = urlCreator.createObjectURL(imageblob);
                          
            let prop = {image:imageurl, id: modelnames[i], offline:(res && res.scsdata)};
            this._modelTable.addData([prop], false);
        }
    }

    async _loadNewModel(modelname)
    { 
        await hwv.model.clear();

        let scsblob;
        let res = await db.models.get(modelname);
        if (!res || !res.scsdata)
        {
            let scsdata = await fetch(serveraddress + "/api/scs/" + modelname);
            scsblob = await scsdata.blob();
            await db.models.update(modelname, {
                scsdata: scsblob,
            });
            var row = this._modelTable.getRow(modelname);
            row.update({offline:true});
        }
        else
        { 
            scsblob = res.scsdata;
        }
        let buffer = await scsblob.arrayBuffer();
        let byteArray = new Uint8Array(buffer);
        hwv.model.loadSubtreeFromScsBuffer(hwv.model.getRootNode(), byteArray);
    }

}