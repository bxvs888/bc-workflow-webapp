bc.namespace("bc.sidebar");
bc.sidebar = {
	refresh : function() {
		bc.sidebar.todo.refresh();
	}
};
bc.sidebar.todo = {
	init : function() {
		var $page = $(this);
		
		// 绑定查看更多事件
		$page.delegate(".more",{
			click: function(){
				bc.page.newWin({
					name: "我的待办",
					mid: "personals",
					url: bc.root+ "/bc-workflow/todo/personals/list",
				});
			}
		});
		
		// 绑定刷新事件
		$page.find('.refresh').click(function(){
			$page.delegate(".refresh",{
				click: function(){
					//bc.sidebar.refresh();
					bc.sidebar.todo.refresh.call($page);
				}
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
											bc.sidebar.refresh();
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
	},
	
	/** 
	 * 刷新待办边栏的数据
	 * 
	 */
	refresh: function(){
		var $sidebar = $(this);
		if(!$sidebar.is(".sidebar-todo")){
			$sidebar = $("#right").children(".sidebar-todo");
		}
		
		// 显示加载动画
		var $loader = $sidebar.children('#sidebarLoader');
		if($loader.size() == 0){
			$loader = $('<img id="sidebarLoader" src="'+bc.root+'/bc/libs/themes/default/images/loader/loader02_64x64.gif" style="position:absolute;top:50%;margin-top:-32px;;left:50%;margin-left:-32px;"/>');
			$loader.appendTo($sidebar);
		}
		$loader.removeClass("hide");
		
		// 加载待办页面
		bc.ajax({
			url: bc.root + "/bc-workflow/todo/personals/sidebar",
			dataType: "html",
			success: function(html){
				var $dom = $(html).children(".empty,.tasks");
				$sidebar.children(".empty,.tasks").remove();
				$sidebar.append($dom);
				
				// 删除加载动画
				$loader.addClass("hide");
			},
			error: function(){
				// error
				bc.msg.error("加载待办信息异常！");
				
				// 删除加载动画
				$loader.addClass("hide");
			}
		});
	}
};
