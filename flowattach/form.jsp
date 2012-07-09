<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="bc-page" data-type='form' title='<s:property value="title"/>'
	data-saveUrl='<s:url value="/bc-workflow/flowattach/save" />'
	data-js='<s:url value="/bc-workflow/flowattach/form.js"/>'
	data-initMethod='bc.flowattachForm.init'
	data-option='<s:property value="formPageOption"/>' style="overflow-y: auto;">
	<s:form name="flowAttachForm" theme="simple" >
		<table  cellspacing="2" cellpadding="0" style="width:545px;"  >
			<tbody>
				<tr class="widthMarker">
					<td style="width: 80px;"></td>
					<td >&nbsp;</td>
				</tr>
				<!-- 附件  -->
					<s:if test="e.type==1">
					<tr>
						<td class="label">*<s:text name="flowattach.subject"/>:</td>
						<td class="value">
							<s:textfield name="e.subject" cssClass="ui-widget-content" data-validate="required"/>
						</td>
					</tr>
					<tr>
						<td class="label">*<s:text name="flowattach.path"/>:</td>
						<td class="value"  >
							<div class="relative">
								<s:textfield name="e.path" cssClass="ui-widget-content" readonly="true" data-validate="required"/>
								<ul class="inputIcons" style="padding-right:8px">
									<li id="upLoadFileId" class="inputIcon ui-icon ui-icon-circle-arrow-n" style="position: relative;">
										<input type="file" class="auto uploadFile" id="uploadFile" name="uploadFile" title="点击上传文件"
											data-cfg='{"callback":"bc.flowattachForm.afterUploadfile","subdir":"workflow/attachment","source":":input[name=\"e.subject\"]","to":":input[name=\"e.path\"]","ptype":"FlowAttach","puid":"<s:property value="e.uid"/>"}'
											style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;filter: alpha(opacity = 10);opacity: 0;cursor: pointer;">
									</li>
									<li class="downLoadFileId inputIcon ui-icon ui-icon-circle-arrow-s" title='下载附件' >
									<li id="cleanFileId" class="clearSelect inputIcon ui-icon ui-icon-circle-close" title='清除附件'/>	 
								</ul>
							</div>
						</td>
					</tr>
					<tr>
						<td class="topLabel"><s:text name="flowattach.desc"/>:</td>		
						<td class="value">
							<s:textarea rows="3" name="e.desc"  cssClass="ui-widget-content noresize" />
						</td>		
					</tr>
				</s:if>
				<!-- 意见 -->
				<s:elseif test="e.type==2">
					<tr>
						<td class="topLabel">
							*<s:text name="flowattach.comment"/>:
						</td>		
						<td class="value">
								<s:textarea rows="4" name="e.desc" cssClass="ui-widget-content noresize" data-validate="required" />
						</td>		
					</tr>
				</s:elseif>
				<tr>
					<td class="label" colspan="2">
						<div class="formTopInfo">
							登记：<s:property value="e.author.name" />(<s:date name="e.fileDate" format="yyyy-MM-dd HH:mm:ss"/>)
							<s:if test="%{e.modifier != null}">
							，最后修改：<s:property value="e.modifier.name" />(<s:date name="e.modifiedDate" format="yyyy-MM-dd HH:mm:ss"/>)
							</s:if>
						</div>
					</td>		
				</tr>
			</tbody>
		</table>
		<s:hidden name="e.id" />
		<s:hidden name="e.uid" />
		<s:hidden name="e.common" />
		<s:hidden name="e.type" />
		<s:hidden name="e.pid" />
		<s:hidden name="e.tid" />
		<s:hidden name="e.ext" />
		<s:hidden name="e.size" />
		<s:hidden name="e.author.id" />
		<input type="hidden" name="e.fileDate" value='<s:date format="yyyy-MM-dd HH:mm:ss" name="e.fileDate" />'/>
	</s:form>
</div>