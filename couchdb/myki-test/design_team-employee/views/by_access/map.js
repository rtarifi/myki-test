function(doc) {
	if (doc.type === 'team') {
		for (var i in doc.team) {
			for (var accessKey in doc.access) {
  				emit([
					doc.team[i],
					accessKey,
					doc.access[accessKey]
				], {
					level: doc.access[accessKey],
					_id: accessKey
				});
			}
		}
	}
	if (doc.type === 'employee') {
		for (var accessKey in doc.access) {
			emit([
				doc._id,
				accessKey,
				doc.access[accessKey]
			], {
				level: doc.access[accessKey],
				_id: accessKey
			});
		}
	}
}