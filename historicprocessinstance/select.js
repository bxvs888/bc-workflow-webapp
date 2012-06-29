bc.historicProcessInstanceSelectView = {
	/** 打开工作空间 */
	open : function() {
		var $page = $(this);
		
		// 获取选中的行的id单元格
		var $tds = $page.find(".bc-grid>.data>.left tr.ui-state-highlight>td.id");
		if($tds.length == 0){
			bc.msg.slide("请先选择！");
			return false;
		}

		// 获取选中的数据
		var data;
		var $grid = $page.find(".bc-grid");
		var $tr = $grid.find(">.data>.right tr.ui-state-highlight");
		var $hidden=$tr.data("hidden");
		var procinstid=$hidden.procinstid;
		var name = $tr.find("td:eq(1)").attr("data-value");
		
		// 打开工作空间
		bc.flow.openWorkspace({id:procinstid, name:name});
	}
};