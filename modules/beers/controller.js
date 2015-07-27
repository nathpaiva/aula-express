var Model = require("./model"),
	msg = "",
	Controller = {
		create: function (req, res){
			var dados = req.body,
				model = new Model(dados);

			model.save(function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  err;
				} else{
					console.log('Success: ', data);
					msg=  data;
				};
				res.json(msg);
			});
		},
		retrieve: function(req, res) {
			var query = {};
			Model.find(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg = err;
				}
				else{
					console.log('Sucesso:', data);
					msg = data;
				}
				res.json(msg);
			});
		},
		get: function(req, res) {
			var query = {_id: req.params.id};
			Model.findOne(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg = err;
				}
				else{
					console.log('Sucesso:', data);
					msg = data;
				}
				res.json(msg);
			});
		},
		update: function(req, res){
			var query = {_id: req.params.id},
				mod = req.body;
			Model.update(query, mod, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  err;
				} else{
					console.log('Success: ', data);
					msg=  data;
				};
				res.json(msg);
			});

		},
		delete: function(req, res){
			// var query = {_id: req.params.id};
			var idArray = req.params.id,
				idArray = idArray.split(','),
				allIdArray = [];

			for (var i = 0; i < idArray.length; i++) {
				allIdArray.push('ObjectId("' + idArray[i] + '")')
			};

			var query = {_id: {$in: allIdArray}};

			Model.remove(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					msg=  err;
				} else{
					console.log('Success: ', data);
					msg=  data;
				};
				res.json(msg);
			});
		},
		renderList: function(req, res){
			var query = {};
			Model.find(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					res.render('list', err);
				}
				else{
					console.log('Sucesso:', data);
					res.render('list', {beers: data});
				}
			});
		},
		renderGet: function(req, res){
			var query = {_id: req.params.id};
			Model.findOne(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					res.render('get', err);
				}
				else{
					console.log('Sucesso:', data);
					res.render('get', {beers: data});
				}
			});
		},
		renderEdit: function(req, res){
			var query = {_id: req.params.id};
			Model.findOne(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					res.render('error', err);
				} else{
					console.log('Sucesso:', data);
					res.render('edit', {beer: data});
				}
			});
		},
		renderRemove: function(req, res){
			var query = {_id: req.params.id};
			Model.remove(query, function (err, data) {
				if (err){
					console.log('Erro: ', err);
					res.render('error', err);
				} else{
					console.log('Success: ', data);
					res.render('remove');
				};
			});
		},
		renderCreate: function(req, res){
			res.render('create');
		}
	};
module.exports = Controller;