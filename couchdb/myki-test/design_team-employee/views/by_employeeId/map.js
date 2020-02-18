function(doc) {
	if (doc.type === 'team') {
		var i
		for (i in doc.team) {
  			emit(doc.team[i], null);
		}
	}
	if (doc.type === 'employee') {
		emit(doc._id, null);
	}
}