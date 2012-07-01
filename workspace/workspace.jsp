<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="workspace" title='<s:property value="title"/>'
	data-js='<s:url value="/bc-workflow/workspace/workspace.js"/>'
	data-initMethod='bc.flow.workspace.init'
	data-option='<s:property value="pageOption"/>' style="overflow-y: auto;">
	这里输出工作空间信息
</div>