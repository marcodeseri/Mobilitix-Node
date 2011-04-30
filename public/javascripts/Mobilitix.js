/**
 * @author marcodeseri
 */
Ext.regModel('Account', {
    fields: ['profileName', 'tableId']
});
 
 
 Ext.ns('Mobilitix');

Array.prototype.sum = function(){
  for(var i=0,sum=0;i<this.length;sum+=this[i++]);
  return sum;
}


 Ext.setup({
    tabletStartupScreen: '/img/tablet_startup.png',
    phoneStartupScreen: '/img/phone_startup.png',
    onReady: function() {
		
		/*var scope = "https://www.google.com/analytics/feeds";
		var analyticsService = new google.gdata.analytics.AnalyticsService('Mobilitix-Prod-Webapp');	
   		var accountFeedUri = 'https://www.google.com/analytics/feeds/accounts/default?max-results=50';
		 
		var auth = google.accounts.user.checkLogin(scope);
		var inited = false;
    */
    
   
    welcomeCard = new Ext.Panel({id:'welcomeCard', dockedItems: new Ext.Toolbar(basicDockConfig)})
    accountCard = new Ext.Panel({id:'accountCard', dockedItems: new Ext.Toolbar(basicDockConfig)})
    reportCard = new Ext.Panel({id:'reportCard'});
    
    
    appHolder = new Ext.Panel({
       fullscreen: true,
       layout: 'card',
       title: 'Home',
       cls: 'homeCnt',
       id: 'homeTab',
       scroll: 'vertical',
       align: 'center',
       items:[welcomeCard,accountCard,reportCard]   
      });

		
		setReportingPeriod = function(dateString){
 
      eTracker('reportingPeriod', dateString,'');
 
      switch (dateString){
        
        case "today":
          Mobilitix.reportingPeriod = "today";
          Mobilitix.startDate = Mobilitix.endDate = configDate.today.start.format('Y-m-d');
          
          try{
             Ext.get('settingsButton').update('Today');   
          }catch(e){}
         
          return;
          
        case "yesterday":
          Mobilitix.reportingPeriod = "yesterday";
          Mobilitix.startDate = configDate.yesterday.start.format('Y-m-d');
          Mobilitix.endDate = configDate.yesterday.end.format('Y-m-d');
          
         try{
             Ext.get('settingsButton').update('Yesterday');   
          }catch(e){}
          
          return;
          
        case "lastweek":
          Mobilitix.reportingPeriod = "lastweek";
          Mobilitix.startDate = configDate.lastweek.start.format('Y-m-d');
          Mobilitix.endDate = configDate.lastweek.end.format('Y-m-d');
          
          try{
             Ext.get('settingsButton').update('Last Week');   
          }catch(e){}      
          
          return; 
      }
    }
		
		
		// base report config
		setReportingPeriod('lastweek');
		
		

		
    // helper report config methods

    Mobilitix.getDimensionString = function(n){
      dimensionString = '';	
    
      if(Mobilitix.reportConfig.dimension){
      	  if(Mobilitix.reportingPeriod!="lastweek")
	        Mobilitix.reportConfig.currDimension = (Mobilitix.reportConfig.hourDimension) ? (Mobilitix.reportConfig.hourDimension) : (Mobilitix.reportConfig.dimension);                       
	      else 
	       	Mobilitix.reportConfig.currDimension = Mobilitix.reportConfig.dimension
      	
      	dimensionString = "&dimensions=" + Mobilitix.reportConfig.currDimension;
      }		
    	
    
       	 
      return dimensionString;
    }
    
    Mobilitix.getChartSize = function(n){
      if (Ext.is.Phone)
        Mobilitix.reportConfig.currChartSize = Mobilitix.reportConfig.phoneSize;
      else
          Mobilitix.reportConfig.currChartSize = Mobilitix.reportConfig.tabletSize;
        
      return Mobilitix.reportConfig.currChartSize;
    }
      
    Mobilitix.getMetrics = function(n){
       if(Mobilitix.reportingPeriod!="lastweek")
         Mobilitix.reportConfig.currMetrics = (Mobilitix.reportConfig.hourMetrics) ? (Mobilitix.reportConfig.hourMetrics) : (Mobilitix.reportConfig.metrics);

      return Mobilitix.reportConfig.currMetrics[n];
    }
    
    Mobilitix.getMetricsString = function(){
      var stringMetrics = '&metrics=';
      
      if(Mobilitix.reportingPeriod!="lastweek"){
        Mobilitix.reportConfig.currMetrics = (Mobilitix.reportConfig.hourMetrics) ? (Mobilitix.reportConfig.hourMetrics) : (Mobilitix.reportConfig.metrics);
        Mobilitix.reportConfig.currMetricsTitle = (Mobilitix.reportConfig.metricsHourTitle) ? (Mobilitix.reportConfig.metricsHourTitle) : (Mobilitix.reportConfig.metricsTitle);
      }else{
        Mobilitix.reportConfig.currMetrics = Mobilitix.reportConfig.metrics;
        Mobilitix.reportConfig.currMetricsTitle = Mobilitix.reportConfig.metricsTitle;
      }  

      for(var i = 0; i < Mobilitix.reportConfig.currMetrics.length; i++){
        stringMetrics += Mobilitix.reportConfig.currMetrics[i];
    
        if(i !== Mobilitix.reportConfig.currMetrics.length-1)
          stringMetrics += ',';
        }

       return stringMetrics;
    }
    
            
    Mobilitix.getSortString = function(){
      sortString = '';		
    	
     if(Mobilitix.reportConfig.reportType !== "TEXT"){
     	if(Mobilitix.reportingPeriod!="lastweek")
	        Mobilitix.reportConfig.currSort = (Mobilitix.reportConfig.hourSort) ? (Mobilitix.reportConfig.hourSort) : (Mobilitix.reportConfig.sort);
	      else
	        Mobilitix.reportConfig.currSort = Mobilitix.reportConfig.sort;
      	
      	sortString = "&sort=-"+Mobilitix.reportConfig.currSort;
     }	
          
      return sortString;
    }   
	
	
	Mobilitix.getMaxResultsString = function(){
		resultsString = '';		
    	
     	if(Mobilitix.reportConfig.reportType !== "TEXT"){	
	 		resultsString = '&max-results=' + Mobilitix.reportConfig.results;
	 	}
		
		
		return resultsString; 	
	}	 		
    
		
		Mobilitix.AccountStore = new Ext.data.Store({
		    model: 'Account',
		    sorters: 'profileName',
		    getGroupString : function(record) {
		        return record.get('profileName')[0];
		    },
			proxy:new Ext.data.LocalStorageProxy({
		        id: 'account-list'
		    }),
		    data: []
		});
			
	
		// application manager
		var init = {
			 bootstrap: function(){
        
        if(auth)    
          init.appInit();
        else        
          init.welcomeLayout();

        appHolder.doLayout();
      },
      checkAuth:function(){
			  if(!auth)
          google.accounts.user.login(scope);                
       
			},
			welcomeLayout: function(){
			  welcomeCardNotLogged = new Ext.Panel(welcomeCardConfig)
			  welcomeCard.add(welcomeCardNotLogged)
			  welcomeCard.doComponentLayout();
			  			  
				if(Ext.get('loginButton'))
				  Ext.EventManager.on('loginButton','tap',init.checkAuth);
				  
				pTracker('welcomeLayout')  
			},
			appInit: function(){	
				Mobilitix.AccountStore.read({
						scope: this,
			            callback: function(records, operation, successful) {
			                if (records.length == 0) {
        								init.showLoader();
        								analyticsService.getAccountFeed(accountFeedUri, init.accountFeedHandler, init.errorHandler);
        							}
        							else if (records.length == 1){
        								Mobilitix.selectedAccount = Mobilitix.AccountStore.data.items[0].get('tableId');
                       					Mobilitix.accountName = Mobilitix.AccountStore.data.items[0].get('profileName');
                        
                        				init.enableReports();
        							}
        							else{
        							  init.showAccounts()  
        							}
        							
			                    
			            }
			        }
				);
			},
			accountFeedHandler: function(result){
        var entries = result.feed.getEntries();
      
          
        for (var i = 0, entry; entry = entries[i]; ++i) {       
          Mobilitix.AccountStore.add(
            {profileName:entry.getTitle().getText().toUpperCase(), tableId:entry.getTableId().getValue()}
          );
        } 
        Mobilitix.AccountStore.sort('profileName', 'ASC');
        Mobilitix.AccountStore.sync();  
        
        init.showAccounts();
      },  
			showAccounts: function(){
       
         accountList =  new Ext.List({
            height: getDesiredH(0),
            grouped: true,
            indexBar: true,
            centered: true,
            modal: true,
            hideOnMaskTap: false,
            overItemCls: 'x-item-pressed',
            listeners: {
            itemtap: setAccount,
          },
          store: Mobilitix.AccountStore,
          itemTpl: '<div class="accountList"><strong>{profileName}</strong></div>'
           
         });
                     
         accountCard.add(accountList);
        
         init.hideLoader();
         appHolder.doLayout();
         appHolder.setActiveItem('accountCard',  {type: 'slide'});
         
         pTracker('showAccounts'); 
			},	
			enableReports: function(){
				appHolder.setActiveItem('reportCard',  {type: 'slide'})


				if(!Ext.get('tabPanel')){
				  dockedItems = [{
		            dock: 'top',
		            xtype: 'toolbar',
		            pack: 'justify',
		            title: 'Mobilitix', 
		            id:'topDock',
		            items:  headerButtonsR
		          }];    
				  
				  tabpanel = new Ext.TabPanel({
		            id: 'tabPanel',
		            tabBar: {
		                dock: 'bottom',
		                layout: {
		                    pack: 'center'
		                }
            		},
		            fullscreen: true,
		            ui: 'light',
		            dockedItems: dockedItems,		    
		            items: [dashboard,acquisition,outcomes,country,logout]           
          		});  
          
          
	          	// set up listeners
	            dashboard.on("activate", Reports.doDashboard);
	            acquisition.on("activate", Reports.doAcquisition);
	            outcomes.on("activate", Reports.doOutcomes);
	            country.on("activate", Reports.doCountry);
          
            
				}else{
				  
		
					try{				
				   		Ext.get("tabPanel").show(); 
          			}catch(e){eLogger("enableReports", e)}
				}
				
				
				tabpanel.setActiveItem(dashboard);
				appHolder.doLayout()
				
				
				Ext.EventManager.on("logoutButton", 'tap', init.logout);	
				Ext.EventManager.on("accountButton", 'tap', accountSelection);
        		Ext.EventManager.on("settingsButton", 'tap', manageSettings);
       
       
         
		       
		       
		        elms = tabpanel.getDockedComponent('topDock'); 
		        elms.setTitle(Mobilitix.accountName)
		      	
		      	//if(!inited){
		      		//inited = true;
		      		Reports.doDashboard();		      		
		      	//}
		      		
		      	
		      		
		      					
				pTracker('reportsLayout');
			},
			dataManager: function(){
   		  
        		var dataQuery = 'https://www.google.com/analytics/feeds/data' +
      
		          '?start-date=' + Mobilitix.startDate +
		          '&end-date=' + Mobilitix.endDate +
		          Mobilitix.getDimensionString() +
		          Mobilitix.getMetricsString() +
		          Mobilitix.getSortString() +
		          Mobilitix.getMaxResultsString() +		          
		          '&ids=' + Mobilitix.selectedAccount;
		        
		       analyticsService.getDataFeed(dataQuery, init.reportRenderer, init.errorHandler);   
			},
			
			
			reportRenderer: function(result){
				//pTracker(Mobilitix.reportConfig.title);
				
					
				var entries = result.feed.getEntries();
				
				if(Mobilitix.reportConfig.currDimension === 'ga:hour' || Mobilitix.reportConfig.currDimension === 'ga:date')	
					entries = entries.reverse();
					
				var dimensionData    = [];
				var metricsData    = [];
			
			
				if(Mobilitix.reportConfig.reportType !== "TEXT"){
					// metrics arrays init	
					for (m=0; m < Mobilitix.reportConfig.currMetrics.length; m++)
						metricsData[m] = [];
					
						//data  arrrays
						for (var i = 0, entry; entry = entries[i]; ++i) {
					    	if(Mobilitix.reportConfig.currDimension === 'ga:date')
					        	dimensionData.push(formatDate(entry.getValueOf(Mobilitix.reportConfig.currDimension))) 
					        else  
					        	dimensionData.push(entry.getValueOf(Mobilitix.reportConfig.currDimension))
					     
					     
					        for (var z=0; z < Mobilitix.reportConfig.currMetrics.length; z++){
					        	metricsData[z].push(entry.getValueOf(Mobilitix.reportConfig.currMetrics[z]))
						} 
					}
					
					// CHART CONFIG
			          var maxMetVal = Math.max.apply(null, metricsData[0])
			          var dataString = "t:" + metricsData[0].join(",");
			          var range = "&chxr=1,0," + maxMetVal;
			          var scale = "&chds=0," + maxMetVal;
			          var chartSize = "&chs=" + Mobilitix.getChartSize();
			          var chartTitle = "&chtt="+Mobilitix.reportConfig.title + ": " + metricsData[0].sum();
			          var labels = "";
			          if(Mobilitix.reportConfig.reportType !== "SPARKLINE")
			          	labels = Mobilitix.reportConfig.reportType === "LINECHART" ? "&chxl=0:|"+ dimensionData.join("|") : "&chl=" + dimensionData.join("|");
			          
			          
			          // multiple metrics	          
			          if (metricsData.length > 1){	            
			            dataString += "|" +  metricsData[1].join(",");
			            scale += ",0," + maxMetVal;
			            labels += "&chdlp=b&chdl=" + Mobilitix.reportConfig.metricsTitle[0] + "|" + Mobilitix.reportConfig.metricsTitle[1];
			          }
		
		
						
		   
			          // CHART RENDERING
			          if(Mobilitix.reportConfig.chartTarget){
			          	var el = Ext.get(Mobilitix.reportConfig.chartTarget);
			          	el.update("<img src='http://chart.apis.google.com/chart?chd="+dataString+chartSize+labels+scale+range+chartTitle+Mobilitix.reportConfig.options+"'/>");
			          	
			          }
			          
			          // TABLE RECAP
			          if(Mobilitix.reportConfig.tableTarget){
			              
			              	tableEl = Ext.get(Mobilitix.reportConfig.tableTarget);
			            
			              	var outputTable = '<table class="google-visualization-table-table" style="width:280px">';
			              
			              
			              	// TABLE HEADER
							outputTable += '<tr><td class="google-visualization-table-th">'+ Mobilitix.reportConfig.dimensionTitle+'</td>';
							        
							for (var t=0, theader; theader = Mobilitix.reportConfig.metricsTitle[t]; t++){ 
								outputTable += '<td class="google-visualization-table-th">'+theader+'</td>';
							}  
			            
			            
						    // TABLE CONTENT
							for (var i = 0; i < entries.length; i++) {
							    var cssClass = (i % 2 === 0) ? 'google-visualization-table-tr-even' : 'google-visualization-table-tr-odd';            
								
								var row = "";
		
								row += '<td class="google-visualization-table-td">'+ dimensionData[i] + '</td>';
							
								for (var tm=0;  tm < Mobilitix.reportConfig.metrics.length; tm++){ 
							  		row += '<td class="google-visualization-table-td google-visualization-table-td-number">'+ metricsData[tm][i] + '</td>';
							    }
								                
							    
							    outputTable += '<tr class="' +cssClass+'">'+ row + '</tr>'; 
							}
							outputTable += '</table>';
						  
						  // OUTPUT TABLE
						   tableEl.update(outputTable);
						       
						}
					
					
					
				}else{
					if(Mobilitix.reportConfig.textTarget){
			  	
					  	for(var tt=0; tt < Mobilitix.reportConfig.metrics.length; tt++){
					  		var el = Ext.get(Mobilitix.reportConfig.textTarget[tt]);
					  		var tit = Mobilitix.reportConfig.metricsTitle[tt];
					  		var val = entries[0].getValueOf(Mobilitix.reportConfig.currMetrics[tt]);
					  	  	var how = Mobilitix.reportConfig.metricsFormatting[tt];
			          		el.update('<p>'+tit+'</p><span>' + formatMetric(val,how) + '</span>');
			          	
					  	}
					  	
					  }	
					
				}
					         

	          
				
			 
	          
	          
	         
	          
	         if(Mobilitix.currentReport === 'dashboard')     
	         	init.queueManager();
          
          
         
			},
			queueManager:function(){
			   if(Mobilitix.reportQueue.length > 1){
                Mobilitix.reportQueue.splice(0,1);                
                Mobilitix.reportConfig = Mobilitix.reportQueue[0];
                init.dataManager();
		        }else{
		            if(Mobilitix.reportQueue.length == 1){
		              Mobilitix.reportQueue = Reports.dashboardQueue.slice(0);              
		              Mobilitix.reportConfig = Mobilitix.reportQueue[0]
		        }
		            
		        init.postReportRender(); 
          }
              
                    
			},
			postReportRender:function(){
			 acquisition.doComponentLayout();
			 outcomes.doComponentLayout();
			 country.doComponentLayout();
			 
			},
			errorHandler: function(e){
			  console.log(e);
			},	
			hideLoader: function(){
				appLoader.hide();		
			},
			showLoader:function(){
				if (!appLoader) {
				appLoader = new appLoader();
                
	            }
				
	            appLoader.show('pop');	
			},
			logout: function(){		
				google.accounts.user.logout();
				document.location.href = '/';						
			}
			
			
		}
			
		
		var getDesiredW = function(offset) {
		    var viewW = Ext.Element.getViewportWidth(),
		        desiredW = Math.min(viewW-offset, 768);
		
		    return desiredW;
		};
		
		
		var getDesiredH = function(offset){
			var viewH = Ext.Element.getViewportHeight(),
		        desiredH = Math.min(viewH-offset, 768);
		    return desiredH;
			
		}
		
		var formatDate = function(date){
	      month = date.substr(4,2)
	      day = date.substr(6,2);
	      dateString = month+'/'+day;
	      
	      return dateString;
	    }
	    
	    var formatMetric = function(metric,how){
	    	switch(how){
	    		case "dec":
	    			metric = Math.round(metric*10)/10;
	    		
	    			return metric;
	    			break;
	    		case "perc":
	    			metric = Math.round(metric*10)/10;
	    			metric += "%";
	    			
	    			return metric;
	    			break;
	    		case "time":
	    			var h = Math.floor(metric / 3600);
					var m = Math.floor(metric % 3600 / 60);
					var s = Math.floor(metric % 3600 % 60);
					
					return ((h > 0 ? h + ":" : "") + (m > 0 ? (h > 0 && m < 10 ? "0" : "") + m + ":" : "0:") + (s < 10 ? "0" : "") + s);
					break;
				case "none":
					return metric;		
	    	}
	    	
	    	
	    	return;
	    }
	
	
		
		var Reports = {
		  items:[dashboard, acquisition, outcomes, country],
		  reportsId:[
		    'dashVisits','dashPageviews','dashBounces','dashTime','dashGoals',
		    'acquisitionChart','acquisitionTable',
		    'outcomesChart',
		    'countryTable', 'cityTable'
		    ],
		  dashboardQueue: [dashReport_visits,dashReport_basics],  
		  setup: function(type){
		    Mobilitix.reportConfig = {};
		    Mobilitix.reportQueue  = [];
		    Mobilitix.reportQueue.length = 0;
		    
		    if      (type === "dashboard") {               
           		Mobilitix.reportQueue = Reports.dashboardQueue.slice(0);
            	Mobilitix.reportConfig = Mobilitix.reportQueue[0];
	        }   
	        else if (type === "acquisition")
	            Mobilitix.reportConfig = acquisitionReport;
	        else if (type === "outcomes")
	            Mobilitix.reportConfig = outcomesReport;
	        else if (type === "outcomes_commerce")
	            Mobilitix.reportConfig = outcomesReport_commerce;    
	        else if (type === "country")  
	            Mobilitix.reportConfig = countryReport;
	        else if (type === "city")  
	            Mobilitix.reportConfig = countryReport_cities;    
	        else if (type === "acquisition_keywords")
	            Mobilitix.reportConfig = acquisitionReport_keyword;  
	        else
	            Mobilitix.reportConfig = acquisitionReport_referrer;
	
	        Mobilitix.currentReport = type;
	                  
	        Reports.clean();
	        init.dataManager();
		  },
		  clean: function(){
		    for (var i=0; i < Reports.reportsId.length; i++){
		       try{
		          Ext.get(Reports.reportsId[i]).update('');  
		       }catch(e){}                   
        	}      
		  },
		  doDashboard: function(){
        	Reports.setup('dashboard');       
      	  },		  
		  doAcquisition:function(){
		    Reports.setup('acquisition')
		    
		    acquisitionButtonsGroup.setPressed('acquisitionDock_medium',true);
		    
		    Ext.EventManager.on("acquisitionDock_medium", 'tap', Reports.doAcquisition);
	        Ext.EventManager.on("acquisitionDock_keyword", 'tap', Reports.doAcquisition_keyword);
	        Ext.EventManager.on("acquisitionDock_referrer", 'tap', Reports.doAcquisition_referrer);
		  },
		  doOutcomes: function(){
		    Reports.setup('outcomes')
		    
		    outcomesButtonsGroup.setPressed('outcomesDock',true);
		    
		    Ext.EventManager.on("outcomesDock", 'tap', Reports.doOutcomes);
        	Ext.EventManager.on("outcomesDock_commerce", 'tap', Reports.doOutcomes_commerce);
		  },
		  doOutcomes_commerce: function(){
         	 Reports.setup('outcomes_commerce')      		
      	  },		  
		  doCountry: function(){
		    Reports.setup('country')
		    
		    countryButtonsGroup.setPressed('countryDock',true);
		    
		    Ext.EventManager.on("countryDock", 'tap', Reports.doCountry);
        	Ext.EventManager.on("countryDock_city", 'tap', Reports.doCountry_city);
		  },
		  doCountry_city: function(){
		    Reports.setup('city')
		  },
		  doAcquisition_keyword: function(){
		    Reports.clean();
        	Reports.setup('acquisition_keywords')
      	  },
      	  doAcquisition_referrer: function(){
        	Reports.clean();
        	Reports.setup('acquisition_referrer')
          }
		  
		}
		
		
		var setAccount = function(caller, index, item, e){
			Mobilitix.selectedAccount = caller.store.data.items[index].get('tableId');
			Mobilitix.accountName = caller.store.data.items[index].get('profileName');
			
			init.enableReports();
			
		}
				
				
		// feed logic			
		var errorHandler = function(){
			console.log("there was an error");
			
		}


    var accountSelection = function(){
      appHolder.setActiveItem('accountCard', {type:'slide', reverse:true});
      
     
      
      Reports.clean();  
      Ext.get("tabPanel").hide();  

    }


		// settings	
		var manageSettings = function(){
		   
			if (!this.actions) {
                this.actions = new Ext.ActionSheet({
                    items: [{
                        text: 'Today',
						            scope:this,
                        handler : function(){
            							this.actions.hide();
            							setReportingPeriod("today");
            							init.dataManager();
						            }
                    },{
                        text : 'Yesterday',
						            scope:this,
                        handler : function(){
            							setReportingPeriod("yesterday");
            							this.actions.hide();
            							init.dataManager();
						            }
                    },{
                        text : 'Last Week',         
                        scope : this,
                        handler : function(){
  							          setReportingPeriod("lastweek");
                          this.actions.hide();
                          init.dataManager();
                        }
                    }]
                });
            }
            Reports.clean();
            this.actions.show();
		};


		  	
		  init.bootstrap();
		
    }
});