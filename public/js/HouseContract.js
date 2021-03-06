/* contract/DataStorage.sol */
/* gen from browser-solidity */

// 載入網頁之後
$(function () {

	// 連線，連接到本地 enode
	var web3 = new Web3(new Web3.providers.HttpProvider("http://140.119.134.210:8545"))
	var housecontractContract = web3.eth.contract([{"constant":false,"inputs":[],"name":"setContractAmount","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"isInputTenant","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"setTenantAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkLog","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"log","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkRender","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkTenant","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isCompletion","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"string"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"ContractEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"string"},{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"TenantEvent","type":"event"}]);

	$('#setRenterButton').attr("disabled",true);
	$('#setTenantButton').attr("disabled",true);
	$('#executionButton').attr("disabled",true);

	function countUp(elem, endVal, startVal, duration, decimal) {  
	    var startTime = 0;
	    var dec = Math.pow(10, decimal);
	    var progress,value;
	    function startCount(timestamp) {
	        if(!startTime) startTime = timestamp;
	        progress = timestamp - startTime;
	        value = startVal + (endVal - startVal) * (progress / duration);
	        value = (value > endVal) ? endVal : value;
	        value = Math.floor(value*dec) / dec;
	        elem.text(value.toFixed(decimal));
	        progress < duration && requestAnimationFrame(startCount)
	    }
	    requestAnimationFrame(startCount)
	}

	/*$('#coin1').text(web3.fromWei(web3.eth.getBalance('0x0312Ad5F6b5206E136B74635024637Cefd167CB4').toString(),'ether'))
	$('#coin2').text(web3.fromWei(web3.eth.getBalance('0x48B9E77D96e0053D63F2A6c52Ef55BE61F7512dD').toString(),'ether'))*/
    countUp($('#coin1'),web3.fromWei(web3.eth.getBalance('0x0312Ad5F6b5206E136B74635024637Cefd167CB4').toString(),'ether'),0,500,11);
    countUp($('#coin2'),web3.fromWei(web3.eth.getBalance('0x48B9E77D96e0053D63F2A6c52Ef55BE61F7512dD').toString(),'ether'),0,500,11);

	var refresh = setInterval(function(){
    	countUp($('#coin1'),web3.fromWei(web3.eth.getBalance('0x0312Ad5F6b5206E136B74635024637Cefd167CB4').toString(),'ether'),0,500,11);
    	countUp($('#coin2'),web3.fromWei(web3.eth.getBalance('0x48B9E77D96e0053D63F2A6c52Ef55BE61F7512dD').toString(),'ether'),0,500,11);
    },2000);


	$('#checkID1').on('click', function () {
		if($('#renterID').val() != 42){
			$('#errorLog').val('檢查租屋人ID失敗');
			$('#setRenterButton').attr("disabled",true);
		}
		web3.eth.getBalance($('#renterID').val(),function (err, ethBalance) {
			if(!err && ethBalance != 0){
				$('#errorLog').val('檢查租屋人ID成功 請執行創立合約!!!');
				$('#setRenterButton').attr("disabled",false);
			}
			else{
				$('#errorLog').val('檢查租屋人ID失敗');
				$('#setRenterButton').attr("disabled",true);
			}
		}) 
	})

	$('#checkID2').on('click', function () {
		if($('#tenantID').val() != 42){
			$('#errorLog').val('檢查承租人ID失敗');
			$('#setTenantButton').attr("disabled",true);
		}
		web3.eth.getBalance($('#tenantID').val(),function (err, ethBalance) {
			if(!err && ethBalance != 0){
				$('#errorLog').val('檢查承租人ID成功 請執行簽訂合約!!!');
				$('#setTenantButton').attr("disabled",false);
			}
			else{
				$('#errorLog').val('檢查承租人ID失敗');
				$('#setTenantButton').attr("disabled",true);
			}
		}) 
	})

	$('#setRenterButton').on('click', function () {
		this.disabled=true;
		$('#log').val('請求建立合約已送出 請等待Address生效...');
		$('#contractAddress').val('請等待生成...');
		$('#transactionHash').val('請等待生成...');
		var housecontract = housecontractContract.new(
		   {
		     from: $('#renterID').val(), 
		     data: '0x6060604052604060405190810160405280600781526020017f496e697469616c0000000000000000000000000000000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008657805160ff19168380011785556100b4565b828001600101855582156100b4579182015b828111156100b3578251825591602001919060010190610098565b5b5090506100d991905b808211156100d55760008160009055506001016100bd565b5090565b505034610000575b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600360006101000a81548160ff0219169083151502179055506000600360016101000a81548160ff0219169083151502179055505b5b610cdd806101ab6000396000f30060606040523615610097576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063047cfc8a1461009c57806313362163146100a65780631a695230146100cd5780632637e4b61461010057806330a2153c1461010f57806351973ec9146101a557806352624bb21461023b578063a64ab8991461028a578063b67f0658146102d9575b610000565b6100a4610300565b005b34610000576100b3610623565b604051808215151515815260200191505060405180910390f35b34610000576100fe600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610636565b005b346100005761010d610694565b005b346100005761011c610af8565b604051808060200182810382528381815181526020019150805190602001908083836000831461016b575b80518252602083111561016b57602082019150602081019050602083039250610147565b505050905090810190601f1680156101975780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34610000576101b2610baa565b6040518080602001828103825283818151815260200191508051906020019080838360008314610201575b805182526020831115610201576020820191506020810190506020830392506101dd565b505050905090810190601f16801561022d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3461000057610248610c48565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3461000057610297610c73565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610000576102e6610c9e565b604051808215151515815260200191505060405180910390f35b60001515600360019054906101000a900460ff1615151480156103705750600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b15610497576103a0600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610636565b6001600360016101000a81548160ff021916908315150217905550604060405190810160405280601281526020017fe68890e58a9fe582b3e98081e98791e98ca2000000000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061043d57805160ff191683800117855561046b565b8280016001018555821561046b579182015b8281111561046a57825182559160200191906001019061044f565b5b50905061049091905b8082111561048c576000816000905550600101610474565b5090565b505061057c565b6104a033610636565b604060405190810160405280600581526020017f4572726f7200000000000000000000000000000000000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061052257805160ff1916838001178555610550565b82800160010185558215610550579182015b8281111561054f578251825591602001919060010190610534565b5b50905061057591905b80821115610571576000816000905550600101610559565b5090565b5050610000565b7f31c03d0c1f5b7a8e1cf64b2ae182fc849e3c7d95fa96bf2ff16aed73848315513342604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825260208152602001807fe59088e7b484e68890e58a9f21e582b3e98081e98791e98ca2e68890e58a9f21815250602001935050505060405180910390a15b565b600360009054906101000a900460ff1681565b8073ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051809050600060405180830381858888f19350505050151561069057610000565b5b50565b60001515600360009054906101000a900460ff1615151480156107055750600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614155b15610842576001600360006101000a81548160ff02191690831515021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604060405190810160405280601581526020017fe68890e58a9fe8a8ade5ae9ae689bfe7a79fe88085000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106107e857805160ff1916838001178555610816565b82800160010185558215610816579182015b828111156108155782518255916020019190600101906107fa565b5b50905061083b91905b8082111561083757600081600090555060010161081f565b5090565b5050610a51565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561097457604060405190810160405280600581526020017f6572726f7200000000000000000000000000000000000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061091a57805160ff1916838001178555610948565b82800160010185558215610948579182015b8281111561094757825182559160200191906001019061092c565b5b50905061096d91905b80821115610969576000816000905550600101610951565b5090565b5050610000565b604060405190810160405280600581526020017f6572726f7200000000000000000000000000000000000000000000000000000081525060029080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106109f657805160ff1916838001178555610a24565b82800160010185558215610a24579182015b82811115610a23578251825591602001919060010190610a08565b5b509050610a4991905b80821115610a45576000816000905550600101610a2d565b5090565b5050610000565b5b7f834322a8547f1a9e7bfae7c26845faf4517be9863d968ed08c5c49c18f5a12b93342604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001838152602001828103825260168152602001807fe68890e58a9fe8a8ade5ae9ae689bfe7a79fe880852100000000000000000000815250602001935050505060405180910390a15b565b602060405190810160405280600081525060028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610b9f5780601f10610b7457610100808354040283529160200191610b9f565b820191906000526020600020905b815481529060010190602001808311610b8257829003601f168201915b505050505090505b90565b60028054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610c405780601f10610c1557610100808354040283529160200191610c40565b820191906000526020600020905b815481529060010190602001808311610c2357829003601f168201915b505050505081565b6000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b600360019054906101000a900460ff16815600a165627a7a72305820b948ffe2b24225817a40ccc6c797fff20a62d39a285286d63fa261a5ca5d90970029', 
		     gas: '4700000'
		   }, function (e, contract){

		    //console.log(e, contract);
		    if (typeof contract.address !== 'undefined') {
		    	$('#log').val('契約生效 顯示Address於上方!!!');
		    	$('#contractAddress').val(contract.address);
		    	$('#transactionHash').val(contract.transactionHash);


		    	$('#setTenantButton').on('click', function () {
		    		$('#log').val('執行承租人簽訂契約契約 請等待...');
		    		$('#transactionHash').val('請等待生成...');
		    		this.disabled=true;
		    		housecontract.setTenantAddress({
						from: $('#tenantID').val(),
						gas: 4600000
					}, function (err, txhash){
						$('#transactionHash').val(txhash);
					})
		    	});

		    	$('#executionButton').on('click', function () {
		    		$('#log').val('執行金錢傳送 請等待...');
		    		$('#transactionHash').val('請等待生成...');
		    		this.disabled=true;
		    		housecontract.setContractAmount(
					{
						from: $('#tenantID').val(),
						value: web3.toWei($('#contractAmount').val(), 'ether'),
						gas: 4600000
					}, function (err, txhash){
						$('#transactionHash').val(txhash);
					})
		    	});

		    	housecontract.ContractEvent({}, function (err, event) {
				// 更新 log 的數值
					$('#log').val(event.args.value+" From "+ event.args.from)
				})

				housecontract.TenantEvent({}, function (err, event) {
				// 更新 log 的數值
					$('#log').val(event.args.value+" From "+ event.args.from)
					$('#executionButton').attr("disabled",false);
				})


		    	




		         //console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
		    }
		 })
	})

})
