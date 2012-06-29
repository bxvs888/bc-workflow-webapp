bc.historicProcessInstanceSelectView = {
	/** 点击确认按钮后的处理函数 */
	clickOk : function() {
		var $page = $(this);
		
		// 获取选中的行的id单元格
		var $tds = $page.find(".bc-grid>.data>.left tr.ui-state-highlight>td.id");
		if($tds.length == 0){
			alert("请先选择！");
			return false;
		}

		// 获取选中的数据
		var data;
		var $grid = $page.find(".bc-grid");
		var $tr = $grid.find(">.data>.right tr.ui-state-highlight");
		var $hidden=$tr.data("hidden");
		
		var procinstid=$hidden.procinstid;
		var url=bc.root+"/bc-workflow/workspace/open?id=";
		$.ajax({
			url:url+procinstid,
			success:function(data){
				
			}
		});
	}
};