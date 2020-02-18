function(doc) {
	if (doc.type === 'folder') {
		for (var i in doc.items) {
  			emit([doc._id, doc.items[i]], {
				_id: doc.items[i]
			});
		}
	}
}