		var setting = {
			check: {
				enable: true,
				chkboxType: {"Y":"", "N":""}
			},
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeClick: beforeClick,
				onCheck: onCheck
			}
		};
		var zNodes =[
			{ id:1, pId:0, name:"随意勾选 1", open:true},
			{ id:11, pId:1, name:"随意勾选 1-1", open:true},
			{ id:111, pId:11, name:"随意勾选 1-1-1"},
			{ id:112, pId:11, name:"随意勾选 1-1-2"},
			{ id:12, pId:1, name:"随意勾选 1-2", open:true},
			{ id:121, pId:12, name:"随意勾选 1-2-1"},
			{ id:122, pId:0, name:"随意勾选 1-2-2"},
			{ id:2, pId:0, name:"随意勾选 2", checked:false, open:true},
			{ id:21, pId:2, name:"随意勾选 2-1"},
			{ id:22, pId:2, name:"随意勾选 2-2", open:true},
			{ id:221, pId:22, name:"随意勾选 2-2-1", checked:false},
			{ id:222, pId:22, name:"随意勾选 2-2-2"},
			{ id:23, pId:2, name:"随意勾选 2-3"}
		];
		function beforeClick(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		}
		function onCheck(e,treeId,treeNode){
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			var nodes = zTree.getCheckedNodes(true);
			var html='';
			for (var i=0, l=nodes.length; i<l; i++) {
				html +="<li ar="+ nodes[i].tId +">" +nodes[i].name + "<span>X</span></li>"; 
			}
			var targetObj = $('#chosed_stores');
			targetObj.html(html);
		}
		function allCheckd(arg){
			var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        	treeObj.checkAllNodes(arg);
		}
		$('#all_checked').on('click',function(){
			var ischecked=$('#all_checked').is(':checked');
			if(ischecked){
				allCheckd(true);
			}else{
				allCheckd(false);
			}
		})
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
		});