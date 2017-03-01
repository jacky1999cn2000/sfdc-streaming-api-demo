global class OppAmountTrackerController {

	@RemoteAction
	global static Integer getInitialAmount(String stagename){
		List<AggregateResult> arList = [SELECT Sum(Amount) Total FROM Opportunity WHERE StageName=: stagename];

		return Integer.valueOf(arList[0].get('Total'));
	}

}
