bc.namespace("bc.sidebar");
bc.sidebar.todo = {
	init : function() {
		var $page = $(this);
		
		$page.find('.inputIcons').click(function(){
			bc.page.newWin({
				name: "我的待办工作",
				mid: "personals",
				url: bc.root+ "/bc-workflow/todo/personals/list",
			});
		});
	}
};
