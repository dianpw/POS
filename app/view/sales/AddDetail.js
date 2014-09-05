Ext.define('POS.view.sales.AddDetail' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.add-sales-detail',
    id: 'add-sales-detail',
    controller: 'add-sales-detail',

    requires: [
        'POS.custom.field.ComboStock',
        'POS.custom.field.StockAmount',
        'POS.custom.field.ComboSellType',
        'POS.custom.field.Price',
        'POS.view.sales.AddDetailController'
    ],

	autoScroll: true,
    autoShow: true,
    bodyStyle: {
        'background-color': '#e9eaed',
        border: '0 !important',
        padding: '25px'
    },
    constrain: true,
    layout: 'anchor',
    maximized: true,
    modal: true,
    resizable: false,

    initComponent: function(){
        this.title = '<i class="fa fa-tasks glyph"></i> Tambah Data Penjualan';

        this.items = [{
            xtype: 'container',
            layout: 'vbox',
            style: {
                margin: '0 auto'
            },
            width: 900,
            items: [{
                xtype: 'container',
                cls: 'panel',
                margin: '0 0 20 0',
                width: 900,
                items: [{
                    xtype: 'form',
                    monitorValid: true,
                    bodyPadding: 10,
                    items: [{
                        xtype: 'container',
                        anchor: '100%',
                        layout: 'hbox',
                        margin: '0 0 10 0',
                        items:[{
                            xtype: 'field-date',
                            fieldLabel: 'Tanggal',
                            name: 'date',
                            afterLabelTextTpl: REQUIRED,
                            allowBlank: false,
                            value: new Date(),
                            width: 150
                        },{
                            xtype: 'combo-customer',
                            fieldLabel: 'Pelanggan',
                            name: 'customer_id',
                            reference: 'customer',
                            afterLabelTextTpl: REQUIRED,
                            allowBlank: false,
                            margin: '0 0 0 20',
                            width: 200
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Catatan',
                            name: 'note',
                            margin: '0 0 0 20',
                            width: 200
                        },{
                            xtype: 'combo-cashier',
                            fieldLabel: 'Kasir',
                            name: 'cashier_id',
                            reference: 'cashier',
                            afterLabelTextTpl: REQUIRED,
                            allowBlank: false,
                            margin: '0 0 0 20',
                            width: 200
                        }]
                    },{
                        xtype: 'container',
                        anchor: '100%',
                        layout: 'hbox',
                        margin: '0 0 10 0',
                        items:[{
                            xtype: 'field-price',
                            fieldLabel: 'Harga Total',
                            name: 'total_price',
                            saveOnEnter: true,
                            width: 150
                        },{
                            xtype: 'field-price',
                            fieldLabel: 'Dibayar',
                            name: 'paid',
                            saveOnEnter: true,
                            margin: '0 0 0 20',
                            width: 150
                        },{
                            xtype: 'field-price',
                            fieldLabel: 'Sisa',
                            name: 'balance',
                            raedOnly: true,
                            saveOnEnter: true,
                            margin: '0 0 0 20',
                            width: 150
                        }]
                    }]
                }]
            },{
                xtype: 'container',
                cls: 'panel',
                width: 900,
                items: [{
                    xtype: 'container',
                    html: 'Produk yang Dibeli',
                    cls: 'panel-header'
                },{
                    xtype: 'grid-sales-detail',
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        ui: 'footer',
                        items: [{
                            text: '<i class="fa fa-plus-square glyph"></i> Tambah',
                            reference: 'add',
                            handler: 'add'
                        },{
                            text: '<i class="fa fa-edit glyph"></i> Ubah',
                            reference: 'edit',
                            handler: 'edit',
                            disabled: true
                        },{
                            text: '<i class="fa fa-trash-o glyph"></i> Hapus',
                            reference: 'delete',
                            handler: 'delete',
                            disabled: true
                        }]
                    }]
                }]
            }]
        }];

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            items: [{
                text: '<i class="fa fa-save glyph"></i> Simpan',
                handler: 'save'
            },{
                text: '<i class="fa fa-undo glyph"></i> Batal',
                handler: 'close'
            }]
        }];

        this.callParent(arguments);
    }
});