$(function (){
	// 创建基本模型
	var Todo = Backbone.Model.extend({
		defaults: {
			title: "lalala",
			order: Todos.nextOrder(),
			done: false
		},
		toggle: function(){
			this.save({done: !this.get('done')});
		}
	})

	var Todolist = Backbone.Collection.extend({
		model: Todo,
		localStorage: new BackboneLocalStorage('todos-backbone'),
		done: function (){
			return this.where({done: true})
		},
		remaining: function (){
			return this.where({done: false})
		},
		nextOrder: function (){
			if(!this.length) return 1;
			return this.last().get('order');
		},
		comparator: 'order'
	})
	var Todos = new Todolist;
	var TodoView = Backbone.View.extend({
		tagName: 'li',
		template: _.template($('#item-template').html()),
		events: {
			"click .toggle": "toggledone",
			"dbclick .view": "edit",
			"blur .edit" : "close",
			"click a.destroy" : "clear",        
			"keypress .edit"  : "updateOnEnter"
		},
		initialize: function (){
			this.listenTo(this.model,change,this.render);
			this.listenTo(this.model,destroy,this.remove);
		},
		render: function (){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done',this,model.get('done'));
			this.input = this.$('.exit');
			return this;
		},
		toggledone: function (){
			this.model.toggle();
		},
		edit: function (){
			$(this.el).addClass('editing');
			this.input.focus();
		},
		close: function (){
			var value = this.input.val();
			if(!value){
				this.clear();
			}else{
				this.model.save({title: value});
				this.$el.removeClass('editing');
			}
		},
		

	})

})


























