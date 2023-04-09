export default function timeFormat(t){
  return typeof t == 'string'? new Date(t):t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()    
}