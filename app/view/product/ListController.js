Ext.define('POS.view.product.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.list-product',

    requires: [
        'Ext.fn.Util'
    ],

    control: {
        '#': {
            selectionchange: function(sm, selected){
                var btnEdit = this.lookupReference('edit'),
                    btnDelete = this.lookupReference('delete');

                btnEdit.setDisabled(selected.length !== 1);
                btnDelete.setDisabled(selected.length === 0);
            },
            celldblclick: 'edit',
            close: 'onClose',
            itemcontextmenu: 'showMenu'
        }
    },
    
    add: function(){
        Ext.fn.App.window('add-product');
    },

    edit: function(){
        var rec = this.getView().getSelectionModel().getSelection()[0];

        var edit = Ext.fn.App.window('edit-product');
        edit.getController().load(rec.get('id'));
    },
    
    onClose: function(){
        Ext.destroy(this.menu);
    },
    
    remove: function(){
        var sm  = this.getView().getSelectionModel(),
            sel = sm.getSelection(),
            smCount = sm.getCount();
        Ext.Msg.confirm(
            '<i class="fa fa-exclamation-triangle glyph"></i> Hapus Data',
            '<b>Apakah Anda yakin akan menghapus data (<span style="color:red">' + smCount + ' data</span>)?</b><br>',
            function(btn){
                if (btn == 'yes'){
                    var id = [];
                    for(i=0;i<smCount;i++){
                        id.push(sel[i].get('id'));
                    }

                    Ext.fn.App.setLoading(true);
                    var monitor = Ext.fn.WebSocket.monitor(
                        Ext.ws.Main.on('product/destroy', function(websocket, data){
                            clearTimeout(monitor);
                            Ext.fn.App.setLoading(false);
                            if (data.success){
                                POS.app.getStore('Product').load();
                            }else{
                                Ext.fn.App.notification('Ups', data.errmsg);
                            }
                        }, this, {
                            single: true,
                            destroyable: true
                        })
                    );
                    Ext.ws.Main.send('product/destroy', {id: id});
                }
            }
        );
    },
    
    reset: function(){
        this.getView().getStore().search({});
    },
    
    search: function(){
        Ext.fn.App.window('search-product');
    },
    
    showMenu: function(view, record, item, index, e, eOpts) {
        var me = this;
        
        e.stopEvent();
        if (!me.menu) {
            me.menu = new Ext.menu.Menu({
                plain: true,
                items : [{
                    text: '<i class="fa fa-bars main-nav-icon"></i> Lihat Harga Produk',
                    handler: function(){
                        me.showStock();
                    }
                },{
                    text: '<i class="fa fa-edit main-nav-icon"></i> Ubah Kode atau Nama Produk',
                    handler: function(){
                        me.edit();
                    }
                },{
                    text: '<i class="fa fa-trash-o main-nav-icon"></i> Hapus Produk',
                    handler: function(){
                        me.remove();
                    }
                }]
            });
        }
        me.menu.showAt(e.getXY());
    },
    
    showStock: function(){
        var rec = this.getView().getSelectionModel().getSelection()[0];
        
        Ext.fn.App.showProductPrice(rec.get('id'));
    }
    
});
