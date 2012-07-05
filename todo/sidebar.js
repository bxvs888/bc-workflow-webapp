bc.namespace("bc.sidebar");
bc.sidebar.todo = {
	init : function() {
		var $page = $(this);
		
		$page.find('.more').click(function(){
			bc.page.newWin({
				name: "我的待办",
				mid: "personals",
				url: bc.root+ "/bc-workflow/todo/personals/list",
			});
		});
		
		$page.delegate(".task",{
			click: function(e) {
				var $target = $(e.target);
				var $this = $(this);
				var taskId = $this.find(".taskidvalue").children().val();
				var procInstId = $this.find(".procinstidvalue").children().val();
				if($target.is(".toggle")){// 折叠或展开当前任务
					$this.toggleClass("collapse");
					$target.toggleClass("ui-icon-carat-1-se ui-icon-carat-1-nw");
				}else if($target.is(".group")){// 领取任务
					// 检测是否已有签领记录，没有才允许继续签领，避免重复签领
					jQuery.ajax({
						url: bc.root + "/bc-workflow/todo/personals/isSigned", 
						data: {excludeId: taskId}, 
						dataType: "json",
						success: function(json) {
							// 如果已经签领过就提示用户
							if(json.signed == "true"){
								bc.msg.alert('此任务已经签领.');
							}else{
								bc.msg.confirm("确定签领此任务吗？",function(){
									jQuery.ajax({
										url: bc.root + "/bc-workflow/todo/personals/claimTask", 
										data: {excludeId: taskId},
										dataType: "json",
										success: function(json) {
											bc.msg.slide(json.msg);
										}
									});
								});
								return;
							}
						}
					});
				}else if($target.is(".name")){// 打开任务
					bc.page.newWin({
						name: "我的工作空间",
						mid: "workspace"+procInstId,
						url: bc.root+ "/bc-workflow/workspace/open?id="+procInstId
					});
				}
				return false;
			}
		});
	}
};
