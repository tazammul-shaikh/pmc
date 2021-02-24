$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.datepicker').datepicker();
    $('select').formSelect();
});
function showRemainingData(ele){
    if($(window).width()<= 640){
        if($(ele).hasClass('tz-hide')){
            $(ele).removeClass('tz-hide');
        }else{
            $(ele).addClass('tz-hide');
        }   
    }
}
function allData(id){
    const Table = document.getElementById(id);
    for(let i=1;i<Table.rows.length;i++){
        Table.rows[i].style.display = 'table-row';
    }
    $('#date1').val('');
    $('#date2').val('');
    addingSrNo(Table);
}
function monthInNum(m){
    m = m.toLowerCase();
    switch(m){
        case 'jan': return '01';
                    break;
        case 'feb': return '02';
                    break;
        case 'mar': return '03';
                    break;
        case 'apr': return '04';
                    break;
        case 'may': return '05';
                    break;
        case 'jun': return '06';
                    break;
        case 'jul': return '07';
                    break;
        case 'aug': return '08';
                    break;
        case 'sep': return '09';
                    break;
        case 'oct': return '10';
                    break;
        case 'nov': return '11';
                    break;
        case 'dec': return '12';
    }
}
function copiesFilter(){
    const Table = document.getElementById('copiesList');
          inpDate1 = $('#date1').val();
          inpDate2 = $('#date2').val();
    dateFilter(Table,inpDate1,inpDate2);
    addingSrNo(Table);
}
function dateFilter(Table,inpDate1,inpDate2){
    let date1,date2,tableDate;
    if(inpDate1!= '' && inpDate2!= ''){
        date1 = inpDate1.substr(8) + monthInNum(inpDate1.substr(0,3)) + inpDate1.substr(4,2);
        date2 = inpDate2.substr(8) + monthInNum(inpDate2.substr(0,3)) + inpDate2.substr(4,2);
        if(date1 > date2){
            let temp = date1;
            date1 = date2;
            date2 = temp;
        }
        for(let i=1;i<Table.rows.length;i++){
            let tbDate = Table.rows[i].cells[1].innerHTML;
            tableDate = tbDate.substr(8) + monthInNum(tbDate.substr(3,3)) + tbDate.substr(0,2);
            if(date1 <= tableDate && tableDate <= date2){
                Table.rows[i].style.display = 'table-row';
            }else{
                Table.rows[i].style.cssText = 'display:none !important';
            }
        }
    }
}
function sortTableByDate(id){
    const Table = document.getElementById(id);
    for(i=1; i < Table.rows.length - 1; i++){
        for(j=i+1; j< Table.rows.length; j++){
            let date1 = Table.rows[i].cells[1].innerHTML,
                date2 = Table.rows[j].cells[1].innerHTML;
            date1 = date1.substr(7) + monthInNum(date1.substr(3,3)) + date1.substr(0,2);
            date2 = date2.substr(7) + monthInNum(date2.substr(3,3)) + date2.substr(0,2);
            if(date1 > date2){
                Table.rows[i].parentNode.insertBefore(Table.rows[j], Table.rows[i]);
            }
        }
    }
    addingSrNo(Table)
}
function addingSrNo(Table){
    // const Table = document.getElementById('copiesList');
    for(i=1,k=1; i< Table.rows.length; i++){
        if(window.getComputedStyle(Table.rows[i]).display !== "none"){
            Table.rows[i].cells[0].innerHTML = k++;
        }
    }
}
function paymentsFilter(){
    const Table = document.getElementById('paymentList'),
          inpDate1 = $('#paymentDate1').val(),
          inpDate2 = $('#paymentDate2').val(),
          inpStatus = $('#paymentStatus').val()
    dateFilter(Table,inpDate1,inpDate2);
    // statusFilter(Table, inpStatus);
    addingSrNo(Table);
}
// function statusFilter(Table, inpStatus){

// }
