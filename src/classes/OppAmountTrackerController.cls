global class OppAmountTrackerController {

	@RemoteAction
	global static String remoteRequestRouter(String type, Map<String, String> params){

		String jsonString = '';

		if(type == 'getInitialAmount'){
			jsonString = getInitialAmount(params.get('stagename'));
		}

		if(type == 'getOppStages'){
			jsonString = getOppStages();
		}

		return jsonString;
	}

	private static String getInitialAmount(String stagename){

		List<AggregateResult> arList = [SELECT Sum(Amount) Total FROM Opportunity WHERE StageName=: stagename];

		Map<String,Object> jsonMap = new Map<String, Object>();
		jsonMap.put('result', Integer.valueOf(arList[0].get('Total')));

		return JSON.serialize(jsonMap);
	}

	private static String getOppStages(){

		List<String> options = new List<String>();

		Schema.DescribeFieldResult fieldResult = Opportunity.stagename.getDescribe();
		List<Schema.picklistEntry> vls = fieldResult.getPicklistValues();

		for(Schema.picklistEntry v : vls){
				// options.add(new selectOption(v.getLabel(),v.getValue()));
				options.add(v.getValue());
		}

		Map<String,Object> jsonMap = new Map<String, Object>();
		jsonMap.put('result', options);

		return JSON.serialize(jsonMap);
	}

}
