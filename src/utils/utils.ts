export function wait(tm: number) {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), tm);
   });
}

export function log$(p: Promise<any>) {
   p.catch(e => console.warn("promise failed", e));
}

export function debounce<T extends (...a: any) => any>(fn:T, wait:number, leading?:boolean) {
	let timeout:number = 0;
	return [
      function(this:any, ...args:Parameters<T>):void {
         if (leading) {
            let now = Date.now();
            if (now - timeout > wait) {
               timeout = now;
               return fn.apply(this, args);
            }
         } else {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => {
               timeout = 0;
               return fn.apply(this, args);
            }, wait);
         }
      },
      function(this:any, ...args:Parameters<T>):void {
         clearTimeout(timeout);
         return fn.apply(this, args);
      }
   ]
}

export function divide(text:string, ix:number) {
   if (ix <= 0) return [ "", text ];
   if (ix >= text.length) return [ text, "" ];
   return [ text.substring(0, ix), text.substring(ix) ];
}

export function stableStringify(data:any) {
   return (function stringify (node) {
       if (node === undefined) return;
       if (node === null) return 'null';
       if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
       if (typeof node !== 'object') return JSON.stringify(node);

       var i, out;
       if (Array.isArray(node)) {
           out = '[';
           for (i = 0; i < node.length; i++) {
               if (i) out += ',';
               out += stringify(node[i]) || 'null';
           }
           return out + ']';
       }

       var keys = Object.keys(node).sort();
       out = '';
       for (i = 0; i < keys.length; i++) {
           var key = keys[i];
           var value = stringify(node[key]);
           if (!value) continue;
           if (out) out += ',';
           out += JSON.stringify(key) + ':' + value;
       }
       return '{' + out + '}';
   })(data);
};