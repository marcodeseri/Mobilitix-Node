configDate = { 
    today: {
      start: new Date().add(Date.DAY, 0),
      end: new Date().add(Date.DAY, 0)
    },
    yesterday:{
      start: new Date().add(Date.DAY, -1),
      end:new Date().add(Date.DAY, -1)
    },     
    lastweek:{
      start: new Date().add(Date.DAY, -7),
      end:new Date().add(Date.DAY, -1)
    }    
};


var outcomesButtonsGroup = new Ext.SegmentedButton({   
  layout:{pack:'center'},
  items: [{
            text: 'Goals',
            pressed: true,
            id: 'outcomesDock'

        }, {
            text: 'E-commerce',
            id: 'outcomesDock_commerce'
        }]
})

var outcomesDock =  [
  new Ext.Toolbar({
      ui: 'light',
      dock: 'top',
      layout:{pack:'center'},
      allowDepress: true,
      items: [outcomesButtonsGroup]
  })
];

var acquisitionButtonsGroup = new Ext.SegmentedButton({ 
  xtype: 'segmentedbutton',
  layout:{pack:'center'},
  items: [{
            text: 'Medium',
            pressed: true,
            id: 'acquisitionDock_medium'

        }, {
            text: 'Keyword',
            id: 'acquisitionDock_keyword'
        },
         {
            text: 'Campaigns',
            id: 'acquisitionDock_referrer'
        }]
})


var acquisitionDock =  [
  new Ext.Toolbar({
      ui: 'light',
      dock: 'top',
      layout:{pack:'center'},
      allowDepress: true,
      items: [acquisitionButtonsGroup]
  })
];


var countryButtonsGroup = new Ext.SegmentedButton({ 
  xtype: 'segmentedbutton',
  layout:{pack:'center'},
  items: [{
            text: 'Country',
            pressed: true,
            id: 'countryDock'

        }, {
            text: 'City',
            id: 'countryDock_city'
        }]
})

var countryDock =  [
  new Ext.Toolbar({
      ui: 'light',
      dock: 'top',
      layout:{pack:'center'},
      allowDepress: true,
      items: [countryButtonsGroup]
  })
];

var basicDockConfig = {
    xtype: 'toolbar',
    dock: 'top',
    title: 'Mobilitix'    
}

       
appLoader = new Ext.Panel({
    floating: true,
    modal: true,
    centered: true,
    width: 300,
    height:70,
    styleHtmlContent: true,
    hideOnMaskTap: false,
    html: '<div><img src="/img/ajax-loader.gif" alt="loading" style="float:left;padding:0 10px"/> Loading your data</div>',
    
});

 
var welcomeCardConfig = {
	title: 'Mobilitix',
  cls: 'welcomeCnt',
	iconCls: 'settings',
	id: 'welcomeTab',
  scroll: 'vertical',
  html: ['<br/><br/><p>Mobilitix is a Google Analytics Mobile app: tap the button below to get started!</p><br/>',
			'<div id="loginButton"><div id="ext-comp-1141" class=" x-button x-button-action" style="margin:5px auto;width:300px"><span class="x-button-label" id="ext-gen1174">Access <br/> Google Analytics</span></div></div>',
		  '<br/><br/><p style="font-size:12px">You will login on Google Servers: your password is safe with us.</p>']				
};

var logout = new Ext.Component({
	title: 'Logout',
  cls: 'logoutCnt',
	iconCls:'logout',
	id: 'logoutTab',
  scroll: 'vertical',
  html: ['<h1 id="title">Logout</h1>',
			'Sure you want to Logout?',
			'<button id="logoutButton">Logout</button><br/><br/><br/><br/><br/><p style="font-size:10px;color:#aaa;">Icons by http://glyphish.com/</p>']				
});

var dashboardConfig = {
  
  title: 'Dashboard',
  cls: 'dashboardCnt',
  iconCls: 'dashboard',
  id: 'dashboardTab',
  layout:{
   type: 'vbox',
   align:'stretch',
   pack:'start'
  },
  scroll: 'vertical',
  items:[
   
    {
      flex:'4',
      layout:{
        type:'vbox',
        align:'stretch',
        pack:'start'
        
      },
      items:[{
        id: 'dashVisits',
        cls:'chartLoader'
        }]
       
    },
    {
      flex:'1',
      layout:{
        type:'hbox',
        align:'stretch',
        pack:'center'  
      },      
      items:[
        {
          id: 'dashPageviews',
          cls:'dashBasics',
          flex: '1'  
        },
        {
          id: 'dashBounces',
          cls:'dashBasics',
          flex: '1' 
        }
      ]
      
    },
    {
      flex:'1',
      layout:{
          type:'hbox',
          align:'stretch',
          pack:'center'  
      },
      items:[
        {
          id: 'dashTime',
          cls:'dashBasics',
          flex: '1'  
        },
        {
          id: 'dashGoals',
          cls:'dashBasics',
          flex: '1'  
        }
      ]
    }
    
  ]
}



// DASHBOARD
var dashboard = new Ext.Panel(dashboardConfig);

var acquisition = new Ext.Panel({
	title: 'Acquisition',
  cls: 'acquisitionCnt',
	iconCls: 'acquisition',
	id: 'acquisitionTab',
	layout:{type:'vbox',pack:'start',align:'stretch'},
  scroll: 'vertical',
  dockedItems: acquisitionDock,
  items:[{
    id:'acquisitionChart',
  	flex:'2',
    layout:{
      type:'vbox',
      pack:'start',
      align:'stretch'     
    }
  },{
    id:'acquisitionTable',
    flex:'1',
     layout:{
        type:'vbox',
        pack:'start',
        align:'stretch'
    }
  }]
});

var outcomesConfig = {
  
  title: 'Outcomes',
  cls: 'outcomesCnt',
  iconCls: 'outcomes',
  id: 'outcomesTab',
  layout:{type:'vbox',pack:'start',align:'stretch'},
  scroll: 'vertical',
  dockedItems: outcomesDock,
  items:[{
    id:'outcomesChart',
    cls:'chartLoader',
    flex:'3',
    layout:{
      type:'vbox',
      pack:'start',
      align:'stretch'
    }
  },{
    id:'outcomesTable',
    flex:'1',
    layout:{
      type:'vbox',
      align:'stretch'
    }
  }
  ]
}


var countryConfig = {
  title: 'Geo',
  cls: 'countryCnt',
  iconCls: 'country',
  id: 'countryTab',
  layout:{type:'vbox',pack:'start',align:'stretch'},
  scroll: 'vertical',
  dockedItems: countryDock,
  items:[{
    id:'countryTable',
    flex:'3',
    layout:{
      type:'vbox',
      pack:'start',
      align:'stretch'
    }
  },{
    id:'cityTable',
    flex:'1',
    layout:{
      type:'vbox',
      align:'stretch'
    }
  }
  ]
	
}    

var outcomes = new Ext.Panel(outcomesConfig);

var country = new Ext.Panel(countryConfig);


var settingsButton = {
	xtype: 'button',
	text: 'Last Week',
	ui: 'action',
	id: 'settingsButton'
}	


var loginButton = {
	xtype: 'button',
	ui: 'back',
	text: 'Back',
	id: 'accountButton'
}


var headerButtonsR = [
	loginButton,
	{xtype: 'spacer'},
	settingsButton
];


var pTracker = function(page){
  //_gaq.push(['_trackPageview', page]);     
}


var eTracker = function(category, action, label){
  //_gaq.push(['_trackEvent', category, action, label]);     
}


var eLogger = function(context, error){
  //eTracker("ERROR", context, error);
}
