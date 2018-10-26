(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isc=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isy)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="c"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="l"){processStatics(init.statics[b2]=b3.l,b4)
delete b3.l}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.bP"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.bP"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.bP(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.bQ=function(){}
var dart=[["","",,H,{"^":"",i6:{"^":"c;a"}}],["","",,J,{"^":"",
o:function(a){return void 0},
bV:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bj:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bS==null){H.hi()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.a(P.cO("Return interceptor for "+H.b(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$bx()]
if(v!=null)return v
v=H.ho(a)
if(v!=null)return v
if(typeof a=="function")return C.B
y=Object.getPrototypeOf(a)
if(y==null)return C.p
if(y===Object.prototype)return C.p
if(typeof w=="function"){Object.defineProperty(w,$.$get$bx(),{value:C.k,enumerable:false,writable:true,configurable:true})
return C.k}return C.k},
y:{"^":"c;",
H:function(a,b){return a===b},
gw:function(a){return H.az(a)},
i:["aX",function(a){return"Instance of '"+H.aA(a)+"'"}],
"%":"ArrayBuffer|Blob|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|Client|DOMError|DOMImplementation|File|MediaError|Navigator|NavigatorConcurrentHardware|NavigatorUserMediaError|OverconstrainedError|PositionError|PushMessageData|Range|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|WindowClient"},
e3:{"^":"y;",
i:function(a){return String(a)},
gw:function(a){return a?519018:218159},
$isG:1},
e4:{"^":"y;",
H:function(a,b){return null==b},
i:function(a){return"null"},
gw:function(a){return 0},
$isA:1},
by:{"^":"y;",
gw:function(a){return 0},
i:["aZ",function(a){return String(a)}]},
eo:{"^":"by;"},
aT:{"^":"by;"},
aP:{"^":"by;",
i:function(a){var z=a[$.$get$c9()]
if(z==null)return this.aZ(a)
return"JavaScript function for "+H.b(J.as(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isaL:1},
aM:{"^":"y;$ti",
t:function(a,b){H.n(b,H.i(a,0))
if(!!a.fixed$length)H.a7(P.H("add"))
a.push(b)},
I:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.j(z,y,H.b(a[y]))
return z.join(b)},
N:function(a){return this.I(a,"")},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.m(a,b)
return a[b]},
a_:function(a,b,c){var z=a.length
if(b>z)throw H.a(P.aa(b,0,a.length,"start",null))
if(c<b||c>a.length)throw H.a(P.aa(c,b,a.length,"end",null))
if(b===c)return H.r([],[H.i(a,0)])
return H.r(a.slice(b,c),[H.i(a,0)])},
gaG:function(a){if(a.length>0)return a[0]
throw H.a(H.bv())},
ga5:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.a(H.bv())},
a2:function(a,b){var z,y
H.e(b,{func:1,ret:P.G,args:[H.i(a,0)]})
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y]))return!0
if(a.length!==z)throw H.a(P.a0(a))}return!1},
u:function(a,b){var z
for(z=0;z<a.length;++z)if(J.aq(a[z],b))return!0
return!1},
i:function(a){return P.bu(a,"[","]")},
gv:function(a){return new J.bo(a,a.length,0,[H.i(a,0)])},
gw:function(a){return H.az(a)},
gk:function(a){return a.length},
sk:function(a,b){if(!!a.fixed$length)H.a7(P.H("set length"))
if(b<0)throw H.a(P.aa(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.a6(a,b))
if(b>=a.length||b<0)throw H.a(H.a6(a,b))
return a[b]},
j:function(a,b,c){H.v(b)
H.n(c,H.i(a,0))
if(!!a.immutable$list)H.a7(P.H("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(H.a6(a,b))
if(b>=a.length||b<0)throw H.a(H.a6(a,b))
a[b]=c},
$ist:1,
$isk:1,
$isl:1,
l:{
e2:function(a,b){return J.ax(H.r(a,[b]))},
ax:function(a){H.b_(a)
a.fixed$length=Array
return a}}},
i5:{"^":"aM;$ti"},
bo:{"^":"c;a,b,c,0d,$ti",
gq:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.a(H.bX(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
aN:{"^":"y;",
a3:function(a,b){var z
H.b0(b)
if(typeof b!=="number")throw H.a(H.a5(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gaj(b)
if(this.gaj(a)===z)return 0
if(this.gaj(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gaj:function(a){return a===0?1/a<0:a<0},
bB:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.a(P.H(""+a+".toInt()"))},
W:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.a(P.H(""+a+".round()"))},
Z:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.a(P.aa(b,2,36,"radix",null))
z=a.toString(b)
if(C.b.ag(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.a7(P.H("Unexpected toString result: "+z))
x=J.an(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.b.B("0",w)},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gw:function(a){return a&0x1FFFFFFF},
K:function(a,b){if(typeof b!=="number")throw H.a(H.a5(b))
return a-b},
B:function(a,b){if(typeof b!=="number")throw H.a(H.a5(b))
return a*b},
aS:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
b0:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.aB(a,b)},
U:function(a,b){return(a|0)===a?a/b|0:this.aB(a,b)},
aB:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.a(P.H("Result of truncating division is "+H.b(z)+": "+H.b(a)+" ~/ "+b))},
bi:function(a,b){var z
if(a>0)z=this.bh(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
bh:function(a,b){return b>31?0:a>>>b},
C:function(a,b){if(typeof b!=="number")throw H.a(H.a5(b))
return a<b},
P:function(a,b){if(typeof b!=="number")throw H.a(H.a5(b))
return a>b},
$isz:1,
$asz:function(){return[P.q]},
$isaH:1,
$isq:1},
cf:{"^":"aN;",$isu:1},
ce:{"^":"aN;"},
aO:{"^":"y;",
ag:function(a,b){if(b<0)throw H.a(H.a6(a,b))
if(b>=a.length)H.a7(H.a6(a,b))
return a.charCodeAt(b)},
a0:function(a,b){if(b>=a.length)throw H.a(H.a6(a,b))
return a.charCodeAt(b)},
J:function(a,b){H.p(b)
if(typeof b!=="string")throw H.a(P.c3(b,null,null))
return a+b},
aV:function(a,b,c){var z
if(c>a.length)throw H.a(P.aa(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
aU:function(a,b){return this.aV(a,b,0)},
L:function(a,b,c){H.v(c)
if(c==null)c=a.length
if(b<0)throw H.a(P.b9(b,null,null))
if(b>c)throw H.a(P.b9(b,null,null))
if(c>a.length)throw H.a(P.b9(c,null,null))
return a.substring(b,c)},
ap:function(a,b){return this.L(a,b,null)},
bC:function(a){return a.toLowerCase()},
aP:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.a0(z,0)===133){x=J.e5(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.ag(z,w)===133?J.e6(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
B:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.a(C.r)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
Y:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.B(c,z)+a},
bn:function(a,b,c){if(c>a.length)throw H.a(P.aa(c,0,a.length,null,null))
return H.hB(a,b,c)},
u:function(a,b){return this.bn(a,b,0)},
a3:function(a,b){var z
H.p(b)
if(typeof b!=="string")throw H.a(H.a5(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
i:function(a){return a},
gw:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
$isz:1,
$asz:function(){return[P.d]},
$isct:1,
$isd:1,
l:{
cg:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
e5:function(a,b){var z,y
for(z=a.length;b<z;){y=C.b.a0(a,b)
if(y!==32&&y!==13&&!J.cg(y))break;++b}return b},
e6:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.b.ag(a,z)
if(y!==32&&y!==13&&!J.cg(y))break}return b}}}}],["","",,H,{"^":"",
bv:function(){return new P.bD("No element")},
e1:function(){return new P.bD("Too many elements")},
ey:function(a,b,c){H.F(a,"$isl",[c],"$asl")
H.e(b,{func:1,ret:P.u,args:[c,c]})
H.aS(a,0,J.ae(a)-1,b,c)},
aS:function(a,b,c,d,e){H.F(a,"$isl",[e],"$asl")
H.e(d,{func:1,ret:P.u,args:[e,e]})
if(c-b<=32)H.ex(a,b,c,d,e)
else H.ew(a,b,c,d,e)},
ex:function(a,b,c,d,e){var z,y,x,w,v
H.F(a,"$isl",[e],"$asl")
H.e(d,{func:1,ret:P.u,args:[e,e]})
for(z=b+1,y=J.an(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.O(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
ew:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.F(a,"$isl",[a2],"$asl")
H.e(a1,{func:1,ret:P.u,args:[a2,a2]})
z=C.c.U(a0-b+1,6)
y=b+z
x=a0-z
w=C.c.U(b+a0,2)
v=w-z
u=w+z
t=J.an(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.O(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.O(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.O(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.O(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.O(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.O(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.O(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.O(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.O(a1.$2(p,o),0)){n=o
o=p
p=n}t.j(a,y,s)
t.j(a,w,q)
t.j(a,x,o)
t.j(a,v,t.h(a,b))
t.j(a,u,t.h(a,a0))
m=b+1
l=a0-1
if(J.aq(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.C()
if(i<0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else for(;!0;){i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.P()
if(i>0){--l
continue}else{h=l-1
if(i<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
l=h
m=g
break}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
e=a1.$2(j,r)
if(typeof e!=="number")return e.C()
if(e<0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.P()
if(d>0)for(;!0;){i=a1.$2(t.h(a,l),p)
if(typeof i!=="number")return i.P()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.C()
h=l-1
if(i<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=g}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=h
break}}}}f=!1}c=m-1
t.j(a,b,t.h(a,c))
t.j(a,c,r)
c=l+1
t.j(a,a0,t.h(a,c))
t.j(a,c,p)
H.aS(a,b,m-2,a1,a2)
H.aS(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.aq(a1.$2(t.h(a,m),r),0);)++m
for(;J.aq(a1.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.C()
h=l-1
if(i<0){t.j(a,k,t.h(a,m))
g=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=g}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=h
break}}H.aS(a,m,l,a1,a2)}else H.aS(a,m,l,a1,a2)},
t:{"^":"k;"},
aQ:{"^":"t;$ti",
gv:function(a){return new H.cn(this,this.gk(this),0,[H.S(this,"aQ",0)])},
I:function(a,b){var z,y,x,w
z=this.gk(this)
if(b.length!==0){if(z===0)return""
y=H.b(this.A(0,0))
if(z!==this.gk(this))throw H.a(P.a0(this))
for(x=y,w=1;w<z;++w){x=x+b+H.b(this.A(0,w))
if(z!==this.gk(this))throw H.a(P.a0(this))}return x.charCodeAt(0)==0?x:x}else{for(w=0,x="";w<z;++w){x+=H.b(this.A(0,w))
if(z!==this.gk(this))throw H.a(P.a0(this))}return x.charCodeAt(0)==0?x:x}},
N:function(a){return this.I(a,"")},
am:function(a,b){return this.aY(0,H.e(b,{func:1,ret:P.G,args:[H.S(this,"aQ",0)]}))},
al:function(a,b){var z,y
z=H.r([],[H.S(this,"aQ",0)])
C.a.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y)C.a.j(z,y,this.A(0,y))
return z},
O:function(a){return this.al(a,!0)}},
cn:{"^":"c;a,b,c,0d,$ti",
gq:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.an(z)
x=y.gk(z)
if(this.b!==x)throw H.a(P.a0(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.A(z,w);++this.c
return!0}},
cp:{"^":"k;a,b,$ti",
gv:function(a){return new H.eg(J.aJ(this.a),this.b,this.$ti)},
gk:function(a){return J.ae(this.a)},
$ask:function(a,b){return[b]},
l:{
ef:function(a,b,c,d){H.F(a,"$isk",[c],"$ask")
H.e(b,{func:1,ret:d,args:[c]})
if(!!J.o(a).$ist)return new H.dU(a,b,[c,d])
return new H.cp(a,b,[c,d])}}},
dU:{"^":"cp;a,b,$ti",$ist:1,
$ast:function(a,b){return[b]}},
eg:{"^":"bw;0a,b,c,$ti",
p:function(){var z=this.b
if(z.p()){this.a=this.c.$1(z.gq())
return!0}this.a=null
return!1},
gq:function(){return this.a},
$asbw:function(a,b){return[b]}},
W:{"^":"aQ;a,b,$ti",
gk:function(a){return J.ae(this.a)},
A:function(a,b){return this.b.$1(J.dw(this.a,b))},
$ast:function(a,b){return[b]},
$asaQ:function(a,b){return[b]},
$ask:function(a,b){return[b]}},
cP:{"^":"k;a,b,$ti",
gv:function(a){return new H.eM(J.aJ(this.a),this.b,this.$ti)}},
eM:{"^":"bw;a,b,$ti",
p:function(){var z,y
for(z=this.a,y=this.b;z.p();)if(y.$1(z.gq()))return!0
return!1},
gq:function(){return this.a.gq()}},
b5:{"^":"c;$ti"}}],["","",,H,{"^":"",
hb:function(a){return init.types[H.v(a)]},
hm:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.o(a).$isa2},
b:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.as(a)
if(typeof z!=="string")throw H.a(H.a5(a))
return z},
az:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
cu:function(a,b){var z,y,x,w,v,u
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.m(z,3)
y=H.p(z[3])
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return}if(b<2||b>36)throw H.a(P.aa(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.b.a0(w,u)|32)>x)return}return parseInt(a,b)},
ep:function(a){var z,y
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=C.b.aP(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
aA:function(a){var z,y,x,w,v,u,t,s,r
z=J.o(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.u||!!J.o(a).$isaT){v=C.o(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.b.a0(w,0)===36)w=C.b.ap(w,1)
r=H.bU(H.b_(H.ab(a)),0,null)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+r,init.mangledGlobalNames)},
aZ:function(a){throw H.a(H.a5(a))},
m:function(a,b){if(a==null)J.ae(a)
throw H.a(H.a6(a,b))},
a6:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.a8(!0,b,"index",null)
z=H.v(J.ae(a))
if(!(b<0)){if(typeof z!=="number")return H.aZ(z)
y=b>=z}else y=!0
if(y)return P.ag(b,a,"index",null,z)
return P.b9(b,"index",null)},
a5:function(a){return new P.a8(!0,a,null,null)},
a:function(a){var z
if(a==null)a=new P.cs()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.ds})
z.name=""}else z.toString=H.ds
return z},
ds:function(){return J.as(this.dartException)},
a7:function(a){throw H.a(a)},
bX:function(a){throw H.a(P.a0(a))},
T:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.hD(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.bi(x,16)&8191)===10)switch(w){case 438:return z.$1(H.bz(H.b(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.cr(H.b(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$cD()
u=$.$get$cE()
t=$.$get$cF()
s=$.$get$cG()
r=$.$get$cK()
q=$.$get$cL()
p=$.$get$cI()
$.$get$cH()
o=$.$get$cN()
n=$.$get$cM()
m=v.E(y)
if(m!=null)return z.$1(H.bz(H.p(y),m))
else{m=u.E(y)
if(m!=null){m.method="call"
return z.$1(H.bz(H.p(y),m))}else{m=t.E(y)
if(m==null){m=s.E(y)
if(m==null){m=r.E(y)
if(m==null){m=q.E(y)
if(m==null){m=p.E(y)
if(m==null){m=s.E(y)
if(m==null){m=o.E(y)
if(m==null){m=n.E(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.cr(H.p(y),m))}}return z.$1(new H.eK(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cy()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.a8(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cy()
return a},
aI:function(a){var z
if(a==null)return new H.d1(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.d1(a)},
ha:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
hl:function(a,b,c,d,e,f){H.f(a,"$isaL")
switch(H.v(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.a(P.J("Unsupported number of arguments for wrapped closure"))},
aG:function(a,b){var z
H.v(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.hl)
a.$identity=z
return z},
dK:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.o(d).$isl){z.$reflectionInfo=d
x=H.es(z).r}else x=d
w=e?Object.create(new H.ez().constructor.prototype):Object.create(new H.bp(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function(){this.$initialize()}
else{u=$.U
if(typeof u!=="number")return u.J()
$.U=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.c7(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.hb,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.c6:H.bq
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.a("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.c7(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
dH:function(a,b,c,d){var z=H.bq
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
c7:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.dJ(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.dH(y,!w,z,b)
if(y===0){w=$.U
if(typeof w!=="number")return w.J()
$.U=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.at
if(v==null){v=H.b3("self")
$.at=v}return new Function(w+H.b(v)+";return "+u+"."+H.b(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.U
if(typeof w!=="number")return w.J()
$.U=w+1
t+=w
w="return function("+t+"){return this."
v=$.at
if(v==null){v=H.b3("self")
$.at=v}return new Function(w+H.b(v)+"."+H.b(z)+"("+t+");}")()},
dI:function(a,b,c,d){var z,y
z=H.bq
y=H.c6
switch(b?-1:a){case 0:throw H.a(H.eu("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
dJ:function(a,b){var z,y,x,w,v,u,t,s
z=$.at
if(z==null){z=H.b3("self")
$.at=z}y=$.c5
if(y==null){y=H.b3("receiver")
$.c5=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.dI(w,!u,x,b)
if(w===1){z="return function(){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+");"
y=$.U
if(typeof y!=="number")return y.J()
$.U=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.b(z)+"."+H.b(x)+"(this."+H.b(y)+", "+s+");"
y=$.U
if(typeof y!=="number")return y.J()
$.U=y+1
return new Function(z+y+"}")()},
bP:function(a,b,c,d,e,f,g){var z,y
z=J.ax(H.b_(b))
H.v(c)
y=!!J.o(d).$isl?J.ax(d):d
return H.dK(a,z,c,y,!!e,f,g)},
p:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.a(H.Q(a,"String"))},
h8:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.a(H.Q(a,"double"))},
b0:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.a(H.Q(a,"num"))},
h3:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.a(H.Q(a,"bool"))},
v:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.a(H.Q(a,"int"))},
dp:function(a,b){throw H.a(H.Q(a,H.p(b).substring(3)))},
hz:function(a,b){var z=J.an(b)
throw H.a(H.dG(a,z.L(b,3,z.gk(b))))},
f:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.o(a)[b])return a
H.dp(a,b)},
bT:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.o(a)[b]
else z=!0
if(z)return a
H.hz(a,b)},
b_:function(a){if(a==null)return a
if(!!J.o(a).$isl)return a
throw H.a(H.Q(a,"List"))},
hn:function(a,b){if(a==null)return a
if(!!J.o(a).$isl)return a
if(J.o(a)[b])return a
H.dp(a,b)},
df:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.v(z)]
else return a.$S()}return},
aX:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.df(J.o(a))
if(z==null)return!1
y=H.dk(z,null,b,null)
return y},
e:function(a,b){var z,y
if(a==null)return a
if($.bL)return a
$.bL=!0
try{if(H.aX(a,b))return a
z=H.b1(b)
y=H.Q(a,z)
throw H.a(y)}finally{$.bL=!1}},
bR:function(a,b){if(a!=null&&!H.bO(a,b))H.a7(H.Q(a,H.b1(b)))
return a},
da:function(a){var z
if(a instanceof H.h){z=H.df(J.o(a))
if(z!=null)return H.b1(z)
return"Closure"}return H.aA(a)},
hC:function(a){throw H.a(new P.dP(H.p(a)))},
di:function(a){return init.getIsolateTag(a)},
r:function(a,b){a.$ti=b
return a},
ab:function(a){if(a==null)return
return a.$ti},
iK:function(a,b,c){return H.ap(a["$as"+H.b(c)],H.ab(b))},
bk:function(a,b,c,d){var z
H.p(c)
H.v(d)
z=H.ap(a["$as"+H.b(c)],H.ab(b))
return z==null?null:z[d]},
S:function(a,b,c){var z
H.p(b)
H.v(c)
z=H.ap(a["$as"+H.b(b)],H.ab(a))
return z==null?null:z[c]},
i:function(a,b){var z
H.v(b)
z=H.ab(a)
return z==null?null:z[b]},
b1:function(a){var z=H.ad(a,null)
return z},
ad:function(a,b){var z,y
H.F(b,"$isl",[P.d],"$asl")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.bU(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(a===-2)return"dynamic"
if(typeof a==="number"){H.v(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.m(b,y)
return H.b(b[y])}if('func' in a)return H.fO(a,b)
if('futureOr' in a)return"FutureOr<"+H.ad("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
fO:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.d]
H.F(b,"$isl",z,"$asl")
if("bounds" in a){y=a.bounds
if(b==null){b=H.r([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.t(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.m(b,r)
t=C.b.J(t,b[r])
q=y[u]
if(q!=null&&q!==P.c)t+=" extends "+H.ad(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.ad(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.ad(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.ad(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.h9(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.p(z[l])
n=n+m+H.ad(i[h],b)+(" "+H.b(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
bU:function(a,b,c){var z,y,x,w,v,u
H.F(c,"$isl",[P.d],"$asl")
if(a==null)return""
z=new P.bF("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.ad(u,c)}v="<"+z.i(0)+">"
return v},
ap:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aF:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.ab(a)
y=J.o(a)
if(y[b]==null)return!1
return H.dc(H.ap(y[d],z),null,c,null)},
F:function(a,b,c,d){var z,y
H.p(b)
H.b_(c)
H.p(d)
if(a==null)return a
z=H.aF(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.bU(c,0,null)
throw H.a(H.Q(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
dc:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.N(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.N(a[y],b,c[y],d))return!1
return!0},
iI:function(a,b,c){return a.apply(b,H.ap(J.o(b)["$as"+H.b(c)],H.ab(b)))},
dl:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="c"||a.builtin$cls==="A"||a===-1||a===-2||H.dl(z)}return!1},
bO:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="c"||b.builtin$cls==="A"||b===-1||b===-2||H.dl(b)
return z}z=b==null||b===-1||b.builtin$cls==="c"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.bO(a,"type" in b?b.type:null))return!0
if('func' in b)return H.aX(a,b)}y=J.o(a).constructor
x=H.ab(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.N(y,null,b,null)
return z},
n:function(a,b){if(a!=null&&!H.bO(a,b))throw H.a(H.Q(a,H.b1(b)))
return a},
N:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.N(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="A")return!0
if('func' in c)return H.dk(a,b,c,d)
if('func' in a)return c.builtin$cls==="aL"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.N("type" in a?a.type:null,b,x,d)
else if(H.N(a,b,x,d))return!0
else{if(!('$is'+"av" in y.prototype))return!1
w=y.prototype["$as"+"av"]
v=H.ap(w,z?a.slice(1):null)
return H.N(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=H.b1(t)
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.dc(H.ap(r,z),b,u,d)},
dk:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.N(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.N(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.N(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.N(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.hw(m,b,l,d)},
hw:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.N(c[w],d,a[w],b))return!1}return!0},
iJ:function(a,b,c){Object.defineProperty(a,H.p(b),{value:c,enumerable:false,writable:true,configurable:true})},
ho:function(a){var z,y,x,w,v,u
z=H.p($.dj.$1(a))
y=$.bh[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.p($.db.$2(a,z))
if(z!=null){y=$.bh[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bl[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bm(x)
$.bh[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bl[z]=x
return x}if(v==="-"){u=H.bm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dn(a,x)
if(v==="*")throw H.a(P.cO(z))
if(init.leafTags[z]===true){u=H.bm(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dn(a,x)},
dn:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.bV(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bm:function(a){return J.bV(a,!1,null,!!a.$isa2)},
hv:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.bm(z)
else return J.bV(z,c,null,null)},
hi:function(){if(!0===$.bS)return
$.bS=!0
H.hj()},
hj:function(){var z,y,x,w,v,u,t,s
$.bh=Object.create(null)
$.bl=Object.create(null)
H.he()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dq.$1(v)
if(u!=null){t=H.hv(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
he:function(){var z,y,x,w,v,u,t
z=C.y()
z=H.am(C.v,H.am(C.A,H.am(C.n,H.am(C.n,H.am(C.z,H.am(C.w,H.am(C.x(C.o),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dj=new H.hf(v)
$.db=new H.hg(u)
$.dq=new H.hh(t)},
am:function(a,b){return a(b)||b},
hB:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
ao:function(a,b,c){var z
if(b instanceof H.ch){z=b.gbd()
z.lastIndex=0
return a.replace(z,c.replace(/\$/g,"$$$$"))}else{if(b==null)H.a7(H.a5(b))
throw H.a("String.replaceAll(Pattern) UNIMPLEMENTED")}},
dN:{"^":"c;$ti",
i:function(a){return P.bA(this)},
$isD:1},
dO:{"^":"dN;a,b,c,$ti",
gk:function(a){return this.a},
aF:function(a){if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.aF(b))return
return this.aw(b)},
aw:function(a){return this.b[H.p(a)]},
a4:function(a,b){var z,y,x,w,v
z=H.i(this,1)
H.e(b,{func:1,ret:-1,args:[H.i(this,0),z]})
y=this.c
for(x=y.length,w=0;w<x;++w){v=y[w]
b.$2(v,H.n(this.aw(v),z))}},
gG:function(){return new H.eU(this,[H.i(this,0)])}},
eU:{"^":"k;a,$ti",
gv:function(a){var z=this.a.c
return new J.bo(z,z.length,0,[H.i(z,0)])},
gk:function(a){return this.a.c.length}},
er:{"^":"c;a,b,c,d,e,f,r,0x",l:{
es:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.ax(z)
y=z[0]
x=z[1]
return new H.er(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
eG:{"^":"c;a,b,c,d,e,f",
E:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
l:{
Y:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.r([],[P.d])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.eG(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
ba:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
cJ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
em:{"^":"E;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.b(this.a)
return"NullError: method not found: '"+z+"' on null"},
l:{
cr:function(a,b){return new H.em(a,b==null?null:b.method)}}},
e7:{"^":"E;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.b(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.b(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.b(this.a)+")"},
l:{
bz:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.e7(a,y,z?null:b.receiver)}}},
eK:{"^":"E;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
hD:{"^":"h:4;a",
$1:function(a){if(!!J.o(a).$isE)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
d1:{"^":"c;a,0b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isP:1},
h:{"^":"c;",
i:function(a){return"Closure '"+H.aA(this).trim()+"'"},
gaQ:function(){return this},
$isaL:1,
gaQ:function(){return this}},
cA:{"^":"h;"},
ez:{"^":"cA;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
bp:{"^":"cA;a,b,c,d",
H:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bp))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gw:function(a){var z,y
z=this.c
if(z==null)y=H.az(this.a)
else y=typeof z!=="object"?J.ar(z):H.az(z)
return(y^H.az(this.b))>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.b(this.d)+"' of "+("Instance of '"+H.aA(z)+"'")},
l:{
bq:function(a){return a.a},
c6:function(a){return a.c},
b3:function(a){var z,y,x,w,v
z=new H.bp("self","target","receiver","name")
y=J.ax(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
eH:{"^":"E;a",
i:function(a){return this.a},
l:{
Q:function(a,b){return new H.eH("TypeError: "+H.b(P.b4(a))+": type '"+H.da(a)+"' is not a subtype of type '"+b+"'")}}},
dF:{"^":"E;a",
i:function(a){return this.a},
l:{
dG:function(a,b){return new H.dF("CastError: "+H.b(P.b4(a))+": type '"+H.da(a)+"' is not a subtype of type '"+b+"'")}}},
et:{"^":"E;a",
i:function(a){return"RuntimeError: "+H.b(this.a)},
l:{
eu:function(a){return new H.et(a)}}},
cj:{"^":"co;a,0b,0c,0d,0e,0f,r,$ti",
gk:function(a){return this.a},
gG:function(){return new H.e9(this,[H.i(this,0)])},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.ab(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.ab(w,b)
x=y==null?null:y.b
return x}else return this.bq(b)},
bq:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ay(z,J.ar(a)&0x3ffffff)
x=this.aH(y,a)
if(x<0)return
return y[x].b},
j:function(a,b,c){var z,y,x,w,v,u
H.n(b,H.i(this,0))
H.n(c,H.i(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.ac()
this.b=z}this.aq(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ac()
this.c=y}this.aq(y,b,c)}else{x=this.d
if(x==null){x=this.ac()
this.d=x}w=J.ar(b)&0x3ffffff
v=this.ay(x,w)
if(v==null)this.af(x,w,[this.ad(b,c)])
else{u=this.aH(v,b)
if(u>=0)v[u].b=c
else v.push(this.ad(b,c))}}},
a4:function(a,b){var z,y
H.e(b,{func:1,ret:-1,args:[H.i(this,0),H.i(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.a(P.a0(this))
z=z.c}},
aq:function(a,b,c){var z
H.n(b,H.i(this,0))
H.n(c,H.i(this,1))
z=this.ab(a,b)
if(z==null)this.af(a,b,this.ad(b,c))
else z.b=c},
bc:function(){this.r=this.r+1&67108863},
ad:function(a,b){var z,y
z=new H.e8(H.n(a,H.i(this,0)),H.n(b,H.i(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.bc()
return z},
aH:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aq(a[y].a,b))return y
return-1},
i:function(a){return P.bA(this)},
ab:function(a,b){return a[b]},
ay:function(a,b){return a[b]},
af:function(a,b,c){a[b]=c},
ba:function(a,b){delete a[b]},
ac:function(){var z=Object.create(null)
this.af(z,"<non-identifier-key>",z)
this.ba(z,"<non-identifier-key>")
return z},
$isck:1},
e8:{"^":"c;a,b,0c,0d"},
e9:{"^":"t;a,$ti",
gk:function(a){return this.a.a},
gv:function(a){var z,y
z=this.a
y=new H.ea(z,z.r,this.$ti)
y.c=z.e
return y}},
ea:{"^":"c;a,b,0c,0d,$ti",
gq:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a0(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
hf:{"^":"h:4;a",
$1:function(a){return this.a(a)}},
hg:{"^":"h:13;a",
$2:function(a,b){return this.a(a,b)}},
hh:{"^":"h:14;a",
$1:function(a){return this.a(H.p(a))}},
ch:{"^":"c;a,b,0c,0d",
i:function(a){return"RegExp/"+this.a+"/"},
gbd:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ci(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
$isct:1,
l:{
ci:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.a(P.bs("Illegal RegExp pattern ("+String(w)+")",a,null))}}}}],["","",,H,{"^":"",
h9:function(a){return J.e2(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
hy:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
Z:function(a,b,c){if(a>>>0!==a||a>=c)throw H.a(H.a6(b,a))},
ei:{"^":"y;","%":"DataView;ArrayBufferView;bB|cY|cZ|eh|d_|d0|a9"},
bB:{"^":"ei;",
gk:function(a){return a.length},
$isa2:1,
$asa2:I.bQ},
eh:{"^":"cZ;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
j:function(a,b,c){H.v(b)
H.h8(c)
H.Z(b,a,a.length)
a[b]=c},
$ist:1,
$ast:function(){return[P.aH]},
$asb5:function(){return[P.aH]},
$asC:function(){return[P.aH]},
$isk:1,
$ask:function(){return[P.aH]},
$isl:1,
$asl:function(){return[P.aH]},
"%":"Float32Array|Float64Array"},
a9:{"^":"d0;",
j:function(a,b,c){H.v(b)
H.v(c)
H.Z(b,a,a.length)
a[b]=c},
$ist:1,
$ast:function(){return[P.u]},
$asb5:function(){return[P.u]},
$asC:function(){return[P.u]},
$isk:1,
$ask:function(){return[P.u]},
$isl:1,
$asl:function(){return[P.u]}},
ib:{"^":"a9;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"Int16Array"},
ic:{"^":"a9;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"Int32Array"},
id:{"^":"a9;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"Int8Array"},
ie:{"^":"a9;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
ig:{"^":"a9;",
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
ih:{"^":"a9;",
gk:function(a){return a.length},
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
ii:{"^":"a9;",
gk:function(a){return a.length},
h:function(a,b){H.Z(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
cY:{"^":"bB+C;"},
cZ:{"^":"cY+b5;"},
d_:{"^":"bB+C;"},
d0:{"^":"d_+b5;"}}],["","",,P,{"^":"",
eN:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.h0()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aG(new P.eP(z),1)).observe(y,{childList:true})
return new P.eO(z,y,x)}else if(self.setImmediate!=null)return P.h1()
return P.h2()},
iy:[function(a){self.scheduleImmediate(H.aG(new P.eQ(H.e(a,{func:1,ret:-1})),0))},"$1","h0",4,0,3],
iz:[function(a){self.setImmediate(H.aG(new P.eR(H.e(a,{func:1,ret:-1})),0))},"$1","h1",4,0,3],
iA:[function(a){H.e(a,{func:1,ret:-1})
P.fA(0,a)},"$1","h2",4,0,3],
cC:function(a,b){var z
H.e(b,{func:1,ret:-1,args:[P.aj]})
z=C.c.U(a.a,1000)
return P.fB(z<0?0:z,b)},
fS:function(a,b){if(H.aX(a,{func:1,args:[P.c,P.P]}))return b.bu(a,null,P.c,P.P)
if(H.aX(a,{func:1,args:[P.c]}))return H.e(a,{func:1,ret:null,args:[P.c]})
throw H.a(P.c3(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
fR:function(){var z,y
for(;z=$.al,z!=null;){$.aD=null
y=z.b
$.al=y
if(y==null)$.aC=null
z.a.$0()}},
iH:[function(){$.bM=!0
try{P.fR()}finally{$.aD=null
$.bM=!1
if($.al!=null)$.$get$bH().$1(P.dd())}},"$0","dd",0,0,1],
d9:function(a){var z=new P.cR(H.e(a,{func:1,ret:-1}))
if($.al==null){$.aC=z
$.al=z
if(!$.bM)$.$get$bH().$1(P.dd())}else{$.aC.b=z
$.aC=z}},
fZ:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
z=$.al
if(z==null){P.d9(a)
$.aD=$.aC
return}y=new P.cR(a)
x=$.aD
if(x==null){y.b=z
$.aD=y
$.al=y}else{y.b=x.b
x.b=y
$.aD=y
if(y.b==null)$.aC=y}},
hA:function(a){var z,y
z={func:1,ret:-1}
H.e(a,z)
y=$.x
if(C.d===y){P.be(null,null,C.d,a)
return}y.toString
P.be(null,null,y,H.e(y.aD(a),z))},
eF:function(a,b){var z,y,x
z={func:1,ret:-1,args:[P.aj]}
H.e(b,z)
y=$.x
if(y===C.d){y.toString
return P.cC(a,b)}x=y.aE(b,P.aj)
$.x.toString
return P.cC(a,H.e(x,z))},
bd:function(a,b,c,d,e){var z={}
z.a=d
P.fZ(new P.fX(z,e))},
d7:function(a,b,c,d,e){var z,y
H.e(d,{func:1,ret:e})
y=$.x
if(y===c)return d.$0()
$.x=c
z=y
try{y=d.$0()
return y}finally{$.x=z}},
d8:function(a,b,c,d,e,f,g){var z,y
H.e(d,{func:1,ret:f,args:[g]})
H.n(e,g)
y=$.x
if(y===c)return d.$1(e)
$.x=c
z=y
try{y=d.$1(e)
return y}finally{$.x=z}},
fY:function(a,b,c,d,e,f,g,h,i){var z,y
H.e(d,{func:1,ret:g,args:[h,i]})
H.n(e,h)
H.n(f,i)
y=$.x
if(y===c)return d.$2(e,f)
$.x=c
z=y
try{y=d.$2(e,f)
return y}finally{$.x=z}},
be:function(a,b,c,d){var z
H.e(d,{func:1,ret:-1})
z=C.d!==c
if(z)d=!(!z||!1)?c.aD(d):c.bm(d,-1)
P.d9(d)},
eP:{"^":"h:5;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
eO:{"^":"h:15;a,b,c",
$1:function(a){var z,y
this.a.a=H.e(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
eQ:{"^":"h:0;a",
$0:function(){this.a.$0()}},
eR:{"^":"h:0;a",
$0:function(){this.a.$0()}},
d3:{"^":"c;a,0b,c",
b3:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aG(new P.fD(this,b),0),a)
else throw H.a(P.H("`setTimeout()` not found."))},
b4:function(a,b){if(self.setTimeout!=null)this.b=self.setInterval(H.aG(new P.fC(this,a,Date.now(),b),0),a)
else throw H.a(P.H("Periodic timer."))},
$isaj:1,
l:{
fA:function(a,b){var z=new P.d3(!0,0)
z.b3(a,b)
return z},
fB:function(a,b){var z=new P.d3(!1,0)
z.b4(a,b)
return z}}},
fD:{"^":"h:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
fC:{"^":"h:0;a,b,c,d",
$0:function(){var z,y,x,w
z=this.a
y=z.c+1
x=this.b
if(x>0){w=Date.now()-this.c
if(w>(y+1)*x)y=C.c.b0(w,x)}z.c=y
this.d.$1(z)}},
ak:{"^":"c;0a,b,c,d,e,$ti",
bs:function(a){if(this.c!==6)return!0
return this.b.b.ak(H.e(this.d,{func:1,ret:P.G,args:[P.c]}),a.a,P.G,P.c)},
bp:function(a){var z,y,x,w
z=this.e
y=P.c
x={futureOr:1,type:H.i(this,1)}
w=this.b.b
if(H.aX(z,{func:1,args:[P.c,P.P]}))return H.bR(w.bw(z,a.a,a.b,null,y,P.P),x)
else return H.bR(w.ak(H.e(z,{func:1,args:[P.c]}),a.a,null,y),x)}},
a4:{"^":"c;aA:a<,b,0be:c<,$ti",
aN:function(a,b,c){var z,y,x,w
z=H.i(this,0)
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.x
if(y!==C.d){y.toString
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.fS(b,y)}H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.a4(0,$.x,[c])
w=b==null?1:3
this.ar(new P.ak(x,w,a,b,[z,c]))
return x},
bA:function(a,b){return this.aN(a,null,b)},
ar:function(a){var z,y
z=this.a
if(z<=1){a.a=H.f(this.c,"$isak")
this.c=a}else{if(z===2){y=H.f(this.c,"$isa4")
z=y.a
if(z<4){y.ar(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.be(null,null,z,H.e(new P.f1(this,a),{func:1,ret:-1}))}},
az:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.f(this.c,"$isak")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.f(this.c,"$isa4")
y=u.a
if(y<4){u.az(a)
return}this.a=y
this.c=u.c}z.a=this.a1(a)
y=this.b
y.toString
P.be(null,null,y,H.e(new P.f6(z,this),{func:1,ret:-1}))}},
ae:function(){var z=H.f(this.c,"$isak")
this.c=null
return this.a1(z)},
a1:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
at:function(a){var z,y,x,w
z=H.i(this,0)
H.bR(a,{futureOr:1,type:z})
y=this.$ti
x=H.aF(a,"$isav",y,"$asav")
if(x){z=H.aF(a,"$isa4",y,null)
if(z)P.cT(a,this)
else P.f2(a,this)}else{w=this.ae()
H.n(a,z)
this.a=4
this.c=a
P.aB(this,w)}},
a8:[function(a,b){var z
H.f(b,"$isP")
z=this.ae()
this.a=8
this.c=new P.K(a,b)
P.aB(this,z)},function(a){return this.a8(a,null)},"bE","$2","$1","gb8",4,2,16],
$isav:1,
l:{
f2:function(a,b){var z,y,x
b.a=1
try{a.aN(new P.f3(b),new P.f4(b),null)}catch(x){z=H.T(x)
y=H.aI(x)
P.hA(new P.f5(b,z,y))}},
cT:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.f(a.c,"$isa4")
if(z>=4){y=b.ae()
b.a=a.a
b.c=a.c
P.aB(b,y)}else{y=H.f(b.c,"$isak")
b.a=2
b.c=a
a.az(y)}},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.f(y.c,"$isK")
y=y.b
u=v.a
t=v.b
y.toString
P.bd(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.aB(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.f(r,"$isK")
y=y.b
u=r.a
t=r.b
y.toString
P.bd(null,null,y,u,t)
return}o=$.x
if(o==null?q!=null:o!==q)$.x=q
else o=null
y=b.c
if(y===8)new P.f9(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.f8(x,b,r).$0()}else if((y&2)!==0)new P.f7(z,x,b).$0()
if(o!=null)$.x=o
y=x.b
if(!!J.o(y).$isav){if(y.a>=4){n=H.f(t.c,"$isak")
t.c=null
b=t.a1(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.cT(y,t)
return}}m=b.b
n=H.f(m.c,"$isak")
m.c=null
b=m.a1(n)
y=x.a
u=x.b
if(!y){H.n(u,H.i(m,0))
m.a=4
m.c=u}else{H.f(u,"$isK")
m.a=8
m.c=u}z.a=m
y=m}}}},
f1:{"^":"h:0;a,b",
$0:function(){P.aB(this.a,this.b)}},
f6:{"^":"h:0;a,b",
$0:function(){P.aB(this.b,this.a.a)}},
f3:{"^":"h:5;a",
$1:function(a){var z=this.a
z.a=0
z.at(a)}},
f4:{"^":"h:17;a",
$2:function(a,b){this.a.a8(a,H.f(b,"$isP"))},
$1:function(a){return this.$2(a,null)}},
f5:{"^":"h:0;a,b,c",
$0:function(){this.a.a8(this.b,this.c)}},
f9:{"^":"h:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.aL(H.e(w.d,{func:1}),null)}catch(v){y=H.T(v)
x=H.aI(v)
if(this.d){w=H.f(this.a.a.c,"$isK").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.f(this.a.a.c,"$isK")
else u.b=new P.K(y,x)
u.a=!0
return}if(!!J.o(z).$isav){if(z instanceof P.a4&&z.gaA()>=4){if(z.gaA()===8){w=this.b
w.b=H.f(z.gbe(),"$isK")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bA(new P.fa(t),null)
w.a=!1}}},
fa:{"^":"h:18;a",
$1:function(a){return this.a}},
f8:{"^":"h:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.i(x,0)
v=H.n(this.c,w)
u=H.i(x,1)
this.a.b=x.b.b.ak(H.e(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.T(t)
y=H.aI(t)
x=this.a
x.b=new P.K(z,y)
x.a=!0}}},
f7:{"^":"h:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.f(this.a.a.c,"$isK")
w=this.c
if(w.bs(z)&&w.e!=null){v=this.b
v.b=w.bp(z)
v.a=!1}}catch(u){y=H.T(u)
x=H.aI(u)
w=H.f(this.a.a.c,"$isK")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.K(y,x)
s.a=!0}}},
cR:{"^":"c;a,0b"},
bE:{"^":"c;$ti",
gk:function(a){var z,y
z={}
y=new P.a4(0,$.x,[P.u])
z.a=0
this.br(new P.eB(z,this),!0,new P.eC(z,y),y.gb8())
return y}},
eB:{"^":"h;a,b",
$1:function(a){H.n(a,H.S(this.b,"bE",0));++this.a.a},
$S:function(){return{func:1,ret:P.A,args:[H.S(this.b,"bE",0)]}}},
eC:{"^":"h:0;a,b",
$0:function(){this.b.at(this.a.a)}},
eA:{"^":"c;$ti"},
aj:{"^":"c;"},
K:{"^":"c;a,b",
i:function(a){return H.b(this.a)},
$isE:1},
fG:{"^":"c;",$isix:1},
fX:{"^":"h:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cs()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.a(z)
x=H.a(z)
x.stack=y.i(0)
throw x}},
fp:{"^":"fG;",
bx:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
try{if(C.d===$.x){a.$0()
return}P.d7(null,null,this,a,-1)}catch(x){z=H.T(x)
y=H.aI(x)
P.bd(null,null,this,z,H.f(y,"$isP"))}},
by:function(a,b,c){var z,y,x
H.e(a,{func:1,ret:-1,args:[c]})
H.n(b,c)
try{if(C.d===$.x){a.$1(b)
return}P.d8(null,null,this,a,b,-1,c)}catch(x){z=H.T(x)
y=H.aI(x)
P.bd(null,null,this,z,H.f(y,"$isP"))}},
bm:function(a,b){return new P.fr(this,H.e(a,{func:1,ret:b}),b)},
aD:function(a){return new P.fq(this,H.e(a,{func:1,ret:-1}))},
aE:function(a,b){return new P.fs(this,H.e(a,{func:1,ret:-1,args:[b]}),b)},
aL:function(a,b){H.e(a,{func:1,ret:b})
if($.x===C.d)return a.$0()
return P.d7(null,null,this,a,b)},
ak:function(a,b,c,d){H.e(a,{func:1,ret:c,args:[d]})
H.n(b,d)
if($.x===C.d)return a.$1(b)
return P.d8(null,null,this,a,b,c,d)},
bw:function(a,b,c,d,e,f){H.e(a,{func:1,ret:d,args:[e,f]})
H.n(b,e)
H.n(c,f)
if($.x===C.d)return a.$2(b,c)
return P.fY(null,null,this,a,b,c,d,e,f)},
bu:function(a,b,c,d){return H.e(a,{func:1,ret:b,args:[c,d]})}},
fr:{"^":"h;a,b,c",
$0:function(){return this.a.aL(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
fq:{"^":"h:1;a,b",
$0:function(){return this.a.bx(this.b)}},
fs:{"^":"h;a,b,c",
$1:function(a){var z=this.c
return this.a.by(this.b,H.n(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
ec:function(a,b,c){H.b_(a)
return H.F(H.ha(a,new H.cj(0,0,[b,c])),"$isck",[b,c],"$asck")},
eb:function(a,b){return new H.cj(0,0,[a,b])},
b6:function(a,b,c,d){return new P.fi(0,0,[d])},
e0:function(a,b,c){var z,y
if(P.bN(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aE()
C.a.t(y,a)
try{P.fQ(a,z)}finally{if(0>=y.length)return H.m(y,-1)
y.pop()}y=P.bG(b,H.hn(z,"$isk"),", ")+c
return y.charCodeAt(0)==0?y:y},
bu:function(a,b,c){var z,y,x
if(P.bN(a))return b+"..."+c
z=new P.bF(b)
y=$.$get$aE()
C.a.t(y,a)
try{x=z
x.a=P.bG(x.gT(),a,", ")}finally{if(0>=y.length)return H.m(y,-1)
y.pop()}y=z
y.a=y.gT()+c
y=z.gT()
return y.charCodeAt(0)==0?y:y},
bN:function(a){var z,y
for(z=0;y=$.$get$aE(),z<y.length;++z)if(a===y[z])return!0
return!1},
fQ:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gv(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.b(z.gq())
C.a.t(b,w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.m(b,-1)
v=b.pop()
if(0>=b.length)return H.m(b,-1)
u=b.pop()}else{t=z.gq();++x
if(!z.p()){if(x<=4){C.a.t(b,H.b(t))
return}v=H.b(t)
if(0>=b.length)return H.m(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gq();++x
for(;z.p();t=s,s=r){r=z.gq();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.m(b,-1)
y-=b.pop().length+2;--x}C.a.t(b,"...")
return}}u=H.b(t)
v=H.b(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.m(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.t(b,q)
C.a.t(b,u)
C.a.t(b,v)},
cl:function(a,b){var z,y,x
z=P.b6(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.bX)(a),++x)z.t(0,H.n(a[x],b))
return z},
bA:function(a){var z,y,x
z={}
if(P.bN(a))return"{...}"
y=new P.bF("")
try{C.a.t($.$get$aE(),a)
x=y
x.a=x.gT()+"{"
z.a=!0
a.a4(0,new P.ee(z,y))
z=y
z.a=z.gT()+"}"}finally{z=$.$get$aE()
if(0>=z.length)return H.m(z,-1)
z.pop()}z=y.gT()
return z.charCodeAt(0)==0?z:z},
fi:{"^":"fb;a,0b,0c,0d,0e,0f,r,$ti",
gv:function(a){var z=new P.fj(this,this.r,this.$ti)
z.c=this.e
return z},
gk:function(a){return this.a},
u:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.f(z[b],"$isbJ")!=null}else{y=this.b9(b)
return y}},
b9:function(a){var z=this.d
if(z==null)return!1
return this.ax(this.bb(z,a),a)>=0},
t:function(a,b){var z,y
H.n(b,H.i(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bK()
this.b=z}return this.as(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bK()
this.c=y}return this.as(y,b)}else return this.b5(b)},
b5:function(a){var z,y,x
H.n(a,H.i(this,0))
z=this.d
if(z==null){z=P.bK()
this.d=z}y=this.au(a)
x=z[y]
if(x==null)z[y]=[this.a7(a)]
else{if(this.ax(x,a)>=0)return!1
x.push(this.a7(a))}return!0},
as:function(a,b){H.n(b,H.i(this,0))
if(H.f(a[b],"$isbJ")!=null)return!1
a[b]=this.a7(b)
return!0},
b7:function(){this.r=this.r+1&67108863},
a7:function(a){var z,y
z=new P.bJ(H.n(a,H.i(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.b7()
return z},
au:function(a){return J.ar(a)&0x3ffffff},
bb:function(a,b){return a[this.au(b)]},
ax:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aq(a[y].a,b))return y
return-1},
l:{
bK:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bJ:{"^":"c;a,0b,0c"},
fj:{"^":"c;a,b,0c,0d,$ti",
gq:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.a(P.a0(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=H.n(z.a,H.i(this,0))
this.c=z.b
return!0}}}},
fb:{"^":"ev;"},
cm:{"^":"fk;",$ist:1,$isk:1,$isl:1},
C:{"^":"c;$ti",
gv:function(a){return new H.cn(a,this.gk(a),0,[H.bk(this,a,"C",0)])},
A:function(a,b){return this.h(a,b)},
I:function(a,b){var z
if(this.gk(a)===0)return""
z=P.bG("",a,b)
return z.charCodeAt(0)==0?z:z},
al:function(a,b){var z,y
z=H.r([],[H.bk(this,a,"C",0)])
C.a.sk(z,this.gk(a))
for(y=0;y<this.gk(a);++y)C.a.j(z,y,this.h(a,y))
return z},
O:function(a){return this.al(a,!0)},
i:function(a){return P.bu(a,"[","]")}},
co:{"^":"b8;"},
ee:{"^":"h:19;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.b(a)
z.a=y+": "
z.a+=H.b(b)}},
b8:{"^":"c;$ti",
a4:function(a,b){var z,y
H.e(b,{func:1,ret:-1,args:[H.S(this,"b8",0),H.S(this,"b8",1)]})
for(z=J.aJ(this.gG());z.p();){y=z.gq()
b.$2(y,this.h(0,y))}},
gk:function(a){return J.ae(this.gG())},
i:function(a){return P.bA(this)},
$isD:1},
cx:{"^":"c;$ti",
D:function(a,b){var z
for(z=J.aJ(H.F(b,"$isk",[H.S(this,"cx",0)],"$ask"));z.p();)this.t(0,z.gq())},
i:function(a){return P.bu(this,"{","}")},
I:function(a,b){var z,y
z=this.gv(this)
if(!z.p())return""
if(b===""){y=""
do y+=H.b(z.d)
while(z.p())}else{y=H.b(z.d)
for(;z.p();)y=y+b+H.b(z.d)}return y.charCodeAt(0)==0?y:y},
$ist:1,
$isk:1},
ev:{"^":"cx;"},
fk:{"^":"c+C;"}}],["","",,P,{"^":"",
hk:function(a,b,c){var z=H.cu(a,c)
if(z!=null)return z
throw H.a(P.bs(a,null,null))},
dX:function(a){var z=J.o(a)
if(!!z.$ish)return z.i(a)
return"Instance of '"+H.aA(a)+"'"},
ed:function(a,b,c){var z,y,x
z=[c]
y=H.r([],z)
for(x=a.gv(a);x.p();)C.a.t(y,H.n(x.gq(),c))
if(b)return y
return H.F(J.ax(y),"$isl",z,"$asl")},
cv:function(a,b,c){return new H.ch(a,H.ci(a,!1,!0,!1))},
b4:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.as(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dX(a)},
J:function(a){return new P.f0(a)},
b7:function(a,b,c,d){var z,y
H.e(b,{func:1,ret:d,args:[P.u]})
z=H.r([],[d])
C.a.sk(z,a)
for(y=0;y<a;++y)C.a.j(z,y,b.$1(y))
return z},
hx:[function(a,b){var z,y
H.p(a)
H.e(b,{func:1,ret:P.q,args:[P.d]})
z=J.c2(a)
y=H.cu(z,null)
if(y==null)y=H.ep(z)
if(y!=null)return y
if(b==null)throw H.a(P.bs(a,null,null))
return b.$1(a)},function(a){return P.hx(a,null)},"$2","$1","bg",4,2,30],
G:{"^":"c;"},
"+bool":0,
z:{"^":"c;"},
aH:{"^":"q;"},
"+double":0,
V:{"^":"c;a",
K:function(a,b){return new P.V(C.c.K(this.a,H.f(b,"$isV").a))},
B:function(a,b){return new P.V(C.c.W(this.a*b))},
C:function(a,b){return C.c.C(this.a,H.f(b,"$isV").a)},
P:function(a,b){return C.c.P(this.a,H.f(b,"$isV").a)},
H:function(a,b){if(b==null)return!1
if(!(b instanceof P.V))return!1
return this.a===b.a},
gw:function(a){return this.a&0x1FFFFFFF},
a3:function(a,b){return C.c.a3(this.a,H.f(b,"$isV").a)},
i:function(a){var z,y,x,w,v
z=new P.dT()
y=this.a
if(y<0)return"-"+new P.V(0-y).i(0)
x=z.$1(C.c.U(y,6e7)%60)
w=z.$1(C.c.U(y,1e6)%60)
v=new P.dS().$1(y%1e6)
return""+C.c.U(y,36e8)+":"+H.b(x)+":"+H.b(w)+"."+H.b(v)},
$isz:1,
$asz:function(){return[P.V]},
l:{
dR:function(a,b,c,d,e,f){return new P.V(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
dS:{"^":"h:2;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
dT:{"^":"h:2;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
E:{"^":"c;"},
cs:{"^":"E;",
i:function(a){return"Throw of null."}},
a8:{"^":"E;a,b,c,d",
gaa:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ga9:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.b(z)
w=this.gaa()+y+x
if(!this.a)return w
v=this.ga9()
u=P.b4(this.b)
return w+v+": "+H.b(u)},
l:{
c3:function(a,b,c){return new P.a8(!0,a,b,c)},
dE:function(a){return new P.a8(!1,null,a,"Must not be null")}}},
bC:{"^":"a8;e,f,a,b,c,d",
gaa:function(){return"RangeError"},
ga9:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.b(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.b(z)
else if(x>z)y=": Not in range "+H.b(z)+".."+H.b(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.b(z)}return y},
l:{
eq:function(a){return new P.bC(null,null,!1,null,null,a)},
b9:function(a,b,c){return new P.bC(null,null,!0,a,b,"Value not in range")},
aa:function(a,b,c,d,e){return new P.bC(b,c,!0,a,d,"Invalid value")}}},
e_:{"^":"a8;e,k:f>,a,b,c,d",
gaa:function(){return"RangeError"},
ga9:function(){if(J.bY(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.b(z)},
l:{
ag:function(a,b,c,d,e){var z=H.v(e!=null?e:J.ae(b))
return new P.e_(b,z,!0,a,c,"Index out of range")}}},
eL:{"^":"E;a",
i:function(a){return"Unsupported operation: "+this.a},
l:{
H:function(a){return new P.eL(a)}}},
eJ:{"^":"E;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
l:{
cO:function(a){return new P.eJ(a)}}},
bD:{"^":"E;a",
i:function(a){return"Bad state: "+this.a},
l:{
cz:function(a){return new P.bD(a)}}},
dM:{"^":"E;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.b(P.b4(z))+"."},
l:{
a0:function(a){return new P.dM(a)}}},
en:{"^":"c;",
i:function(a){return"Out of Memory"},
$isE:1},
cy:{"^":"c;",
i:function(a){return"Stack Overflow"},
$isE:1},
dP:{"^":"E;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
f0:{"^":"c;a",
i:function(a){return"Exception: "+this.a}},
dY:{"^":"c;a,b,c",
i:function(a){var z,y,x
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.b(z):"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.b.L(x,0,75)+"..."
return y+"\n"+x},
l:{
bs:function(a,b,c){return new P.dY(a,b,c)}}},
aL:{"^":"c;"},
u:{"^":"q;"},
"+int":0,
k:{"^":"c;$ti",
am:["aY",function(a,b){var z=H.S(this,"k",0)
return new H.cP(this,H.e(b,{func:1,ret:P.G,args:[z]}),[z])}],
I:function(a,b){var z,y
z=this.gv(this)
if(!z.p())return""
y=H.b(z.gq())
for(;z.p();)y=y+H.b(b)+H.b(z.gq())
return y.charCodeAt(0)==0?y:y},
gk:function(a){var z,y
z=this.gv(this)
for(y=0;z.p();)++y
return y},
gS:function(a){var z,y
z=this.gv(this)
if(!z.p())throw H.a(H.bv())
y=z.gq()
if(z.p())throw H.a(H.e1())
return y},
A:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.a(P.dE("index"))
if(b<0)H.a7(P.aa(b,0,null,"index",null))
for(z=this.gv(this),y=0;z.p();){x=z.gq()
if(b===y)return x;++y}throw H.a(P.ag(b,this,"index",null,y))},
i:function(a){return P.e0(this,"(",")")}},
bw:{"^":"c;$ti"},
l:{"^":"c;$ti",$ist:1,$isk:1},
"+List":0,
D:{"^":"c;$ti"},
A:{"^":"c;",
gw:function(a){return P.c.prototype.gw.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
q:{"^":"c;",$isz:1,
$asz:function(){return[P.q]}},
"+num":0,
c:{"^":";",
H:function(a,b){return this===b},
gw:function(a){return H.az(this)},
i:function(a){return"Instance of '"+H.aA(this)+"'"},
toString:function(){return this.i(this)}},
P:{"^":"c;"},
d:{"^":"c;",$isz:1,
$asz:function(){return[P.d]},
$isct:1},
"+String":0,
bF:{"^":"c;T:a<",
gk:function(a){return this.a.length},
i:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
l:{
bG:function(a,b,c){var z=J.aJ(b)
if(!z.p())return a
if(c.length===0){do a+=H.b(z.gq())
while(z.p())}else{a+=H.b(z.gq())
for(;z.p();)a=a+c+H.b(z.gq())}return a}}}}],["","",,W,{"^":"",
dV:function(a,b,c){var z,y
z=document.body
y=(z&&C.l).F(z,a,b,c)
y.toString
z=W.j
z=new H.cP(new W.R(y),H.e(new W.dW(),{func:1,ret:P.G,args:[z]}),[z])
return H.f(z.gS(z),"$isB")},
au:function(a){var z,y,x
z="element tag unavailable"
try{y=J.dA(a)
if(typeof y==="string")z=a.tagName}catch(x){H.T(x)}return z},
bc:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cX:function(a,b,c,d){var z,y
z=W.bc(W.bc(W.bc(W.bc(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
aV:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.eW(a)
if(!!J.o(z).$isaf)return z
return}else return H.f(a,"$isaf")},
h_:function(a,b){var z
H.e(a,{func:1,ret:-1,args:[b]})
z=$.x
if(z===C.d)return a
return z.aE(a,b)},
L:{"^":"B;","%":"HTMLAudioElement|HTMLBRElement|HTMLButtonElement|HTMLCanvasElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLInputElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|HTMLVideoElement;HTMLElement"},
hE:{"^":"L;",
i:function(a){return String(a)},
"%":"HTMLAnchorElement"},
hF:{"^":"L;",
i:function(a){return String(a)},
"%":"HTMLAreaElement"},
c4:{"^":"L;",$isc4:1,"%":"HTMLBaseElement"},
b2:{"^":"L;",$isb2:1,"%":"HTMLBodyElement"},
hG:{"^":"j;0k:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
aK:{"^":"L;",$isaK:1,"%":"HTMLDivElement"},
hH:{"^":"y;",
i:function(a){return String(a)},
"%":"DOMException"},
dQ:{"^":"y;",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
H:function(a,b){var z
if(b==null)return!1
z=H.aF(b,"$isaR",[P.q],"$asaR")
if(!z)return!1
z=J.a_(b)
return a.left===z.gaI(b)&&a.top===z.gaO(b)&&a.width===z.gan(b)&&a.height===z.gai(b)},
gw:function(a){return W.cX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gai:function(a){return a.height},
gaI:function(a){return a.left},
gaO:function(a){return a.top},
gan:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
$isaR:1,
$asaR:function(){return[P.q]},
"%":";DOMRectReadOnly"},
hI:{"^":"y;0k:length=","%":"DOMTokenList"},
eT:{"^":"cm;av:a<,b",
gk:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.m(z,b)
return H.f(z[b],"$isB")},
j:function(a,b,c){var z
H.v(b)
H.f(c,"$isB")
z=this.b
if(b>>>0!==b||b>=z.length)return H.m(z,b)
this.a.replaceChild(c,z[b])},
gv:function(a){var z=this.O(this)
return new J.bo(z,z.length,0,[H.i(z,0)])},
D:function(a,b){var z,y
H.F(b,"$isk",[W.B],"$ask")
for(z=this.a,y=0;y<3;++y)z.appendChild(b[y])},
$ast:function(){return[W.B]},
$asC:function(){return[W.B]},
$ask:function(){return[W.B]},
$asl:function(){return[W.B]}},
B:{"^":"j;0bz:tagName=",
gbl:function(a){return new W.eX(a)},
i:function(a){return a.localName},
F:["a6",function(a,b,c,d){var z,y,x,w
if(c==null){z=$.cb
if(z==null){z=H.r([],[W.X])
y=new W.cq(z)
C.a.t(z,W.cU(null))
C.a.t(z,W.d2())
$.cb=y
d=y}else d=z
z=$.ca
if(z==null){z=new W.d4(d)
$.ca=z
c=z}else{z.a=d
c=z}}if($.a1==null){z=document
y=z.implementation.createHTMLDocument("")
$.a1=y
$.br=y.createRange()
y=$.a1
y.toString
y=y.createElement("base")
H.f(y,"$isc4")
y.href=z.baseURI
$.a1.head.appendChild(y)}z=$.a1
if(z.body==null){z.toString
y=z.createElement("body")
z.body=H.f(y,"$isb2")}z=$.a1
if(!!this.$isb2)x=z.body
else{y=a.tagName
z.toString
x=z.createElement(y)
$.a1.body.appendChild(x)}if("createContextualFragment" in window.Range.prototype&&!C.a.u(C.D,a.tagName)){$.br.selectNodeContents(x)
w=$.br.createContextualFragment(b)}else{x.innerHTML=b
w=$.a1.createDocumentFragment()
for(;z=x.firstChild,z!=null;)w.appendChild(z)}z=$.a1.body
if(x==null?z!=null:x!==z)J.c0(x)
c.ao(w)
document.adoptNode(w)
return w},function(a,b,c){return this.F(a,b,c,null)},"bo",null,null,"gbF",5,5,null],
aT:function(a,b,c,d){a.textContent=null
a.appendChild(this.F(a,b,c,d))},
R:function(a,b){return this.aT(a,b,null,null)},
$isB:1,
"%":";Element"},
dW:{"^":"h:20;",
$1:function(a){return!!J.o(H.f(a,"$isj")).$isB}},
I:{"^":"y;",
gaM:function(a){return W.aV(a.target)},
$isI:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
af:{"^":"y;",
aC:["aW",function(a,b,c,d){H.e(c,{func:1,args:[W.I]})
if(c!=null)this.b6(a,b,c,!1)}],
b6:function(a,b,c,d){return a.addEventListener(b,H.aG(H.e(c,{func:1,args:[W.I]}),1),!1)},
$isaf:1,
"%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest|MIDIInput|MIDIOutput|MIDIPort|ServiceWorker;EventTarget"},
i2:{"^":"L;0k:length=","%":"HTMLFormElement"},
i3:{"^":"fd;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.ag(b,a,null,null,null))
return a[b]},
j:function(a,b,c){H.v(b)
H.f(c,"$isj")
throw H.a(P.H("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.m(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.j]},
$isa2:1,
$asa2:function(){return[W.j]},
$asC:function(){return[W.j]},
$isk:1,
$ask:function(){return[W.j]},
$isl:1,
$asl:function(){return[W.j]},
$asM:function(){return[W.j]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
bt:{"^":"y;0ah:data=",$isbt:1,"%":"ImageData"},
cd:{"^":"L;",$iscd:1,"%":"HTMLImageElement"},
i8:{"^":"y;",
i:function(a){return String(a)},
"%":"Location"},
ia:{"^":"af;",
aC:function(a,b,c,d){H.e(c,{func:1,args:[W.I]})
if(b==="message")a.start()
this.aW(a,b,c,!1)},
"%":"MessagePort"},
ay:{"^":"eI;",
gaK:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.a3(a.offsetX,a.offsetY,[P.q])
else{z=a.target
if(!J.o(W.aV(z)).$isB)throw H.a(P.H("offsetX is only supported on elements"))
y=H.f(W.aV(z),"$isB")
z=a.clientX
x=a.clientY
w=[P.q]
v=y.getBoundingClientRect()
u=new P.a3(z,x,w).K(0,new P.a3(v.left,v.top,w))
return new P.a3(J.c1(u.a),J.c1(u.b),w)}},
$isay:1,
"%":"DragEvent|MouseEvent|PointerEvent|WheelEvent"},
R:{"^":"cm;a",
gS:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.a(P.cz("No elements"))
if(y>1)throw H.a(P.cz("More than one element"))
return z.firstChild},
D:function(a,b){var z,y,x,w
H.F(b,"$isk",[W.j],"$ask")
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
j:function(a,b,c){var z,y
H.v(b)
H.f(c,"$isj")
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.m(y,b)
z.replaceChild(c,y[b])},
gv:function(a){var z=this.a.childNodes
return new W.cc(z,z.length,-1,[H.bk(C.G,z,"M",0)])},
gk:function(a){return this.a.childNodes.length},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.m(z,b)
return z[b]},
$ast:function(){return[W.j]},
$asC:function(){return[W.j]},
$ask:function(){return[W.j]},
$asl:function(){return[W.j]}},
j:{"^":"af;0bt:previousSibling=",
bv:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
i:function(a){var z=a.nodeValue
return z==null?this.aX(a):z},
$isj:1,
"%":"Document|DocumentFragment|DocumentType|HTMLDocument|ShadowRoot|XMLDocument;Node"},
ej:{"^":"fm;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.ag(b,a,null,null,null))
return a[b]},
j:function(a,b,c){H.v(b)
H.f(c,"$isj")
throw H.a(P.H("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.m(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.j]},
$isa2:1,
$asa2:function(){return[W.j]},
$asC:function(){return[W.j]},
$isk:1,
$ask:function(){return[W.j]},
$isl:1,
$asl:function(){return[W.j]},
$asM:function(){return[W.j]},
"%":"NodeList|RadioNodeList"},
io:{"^":"L;0k:length=","%":"HTMLSelectElement"},
eD:{"^":"L;",
F:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.a6(a,b,c,d)
z=W.dV("<table>"+H.b(b)+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
z.toString
new W.R(y).D(0,new W.R(z))
return y},
"%":"HTMLTableElement"},
iq:{"^":"L;",
F:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.a6(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.q.F(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gS(z)
x.toString
z=new W.R(x)
w=z.gS(z)
y.toString
w.toString
new W.R(y).D(0,new W.R(w))
return y},
"%":"HTMLTableRowElement"},
ir:{"^":"L;",
F:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.a6(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.q.F(z.createElement("table"),b,c,d)
z.toString
z=new W.R(z)
x=z.gS(z)
y.toString
x.toString
new W.R(y).D(0,new W.R(x))
return y},
"%":"HTMLTableSectionElement"},
cB:{"^":"L;",$iscB:1,"%":"HTMLTemplateElement"},
eI:{"^":"I;","%":"CompositionEvent|FocusEvent|KeyboardEvent|TextEvent|TouchEvent;UIEvent"},
iw:{"^":"af;",$iscQ:1,"%":"DOMWindow|Window"},
cS:{"^":"j;",$iscS:1,"%":"Attr"},
iB:{"^":"dQ;",
i:function(a){return"Rectangle ("+H.b(a.left)+", "+H.b(a.top)+") "+H.b(a.width)+" x "+H.b(a.height)},
H:function(a,b){var z
if(b==null)return!1
z=H.aF(b,"$isaR",[P.q],"$asaR")
if(!z)return!1
z=J.a_(b)
return a.left===z.gaI(b)&&a.top===z.gaO(b)&&a.width===z.gan(b)&&a.height===z.gai(b)},
gw:function(a){return W.cX(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gai:function(a){return a.height},
gan:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"ClientRect|DOMRect"},
iF:{"^":"fI;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.ag(b,a,null,null,null))
return a[b]},
j:function(a,b,c){H.v(b)
H.f(c,"$isj")
throw H.a(P.H("Cannot assign element of immutable List."))},
A:function(a,b){if(b>>>0!==b||b>=a.length)return H.m(a,b)
return a[b]},
$ist:1,
$ast:function(){return[W.j]},
$isa2:1,
$asa2:function(){return[W.j]},
$asC:function(){return[W.j]},
$isk:1,
$ask:function(){return[W.j]},
$isl:1,
$asl:function(){return[W.j]},
$asM:function(){return[W.j]},
"%":"MozNamedAttrMap|NamedNodeMap"},
eS:{"^":"co;av:a<",
a4:function(a,b){var z,y,x,w,v
H.e(b,{func:1,ret:-1,args:[P.d,P.d]})
for(z=this.gG(),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.bX)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gG:function(){var z,y,x,w,v
z=this.a.attributes
y=H.r([],[P.d])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.m(z,w)
v=H.f(z[w],"$iscS")
if(v.namespaceURI==null)C.a.t(y,v.name)}return y},
$asb8:function(){return[P.d,P.d]},
$asD:function(){return[P.d,P.d]}},
eX:{"^":"eS;a",
h:function(a,b){return this.a.getAttribute(H.p(b))},
gk:function(a){return this.gG().length}},
eY:{"^":"bE;$ti",
br:function(a,b,c,d){var z=H.i(this,0)
H.e(a,{func:1,ret:-1,args:[z]})
H.e(c,{func:1,ret:-1})
return W.bb(this.a,this.b,a,!1,z)}},
iC:{"^":"eY;a,b,c,$ti"},
eZ:{"^":"eA;a,b,c,d,e,$ti",
bj:function(){var z=this.d
if(z!=null&&this.a<=0)J.du(this.b,this.c,z,!1)},
l:{
bb:function(a,b,c,d,e){var z=c==null?null:W.h_(new W.f_(c),W.I)
z=new W.eZ(0,a,b,z,!1,[e])
z.bj()
return z}}},
f_:{"^":"h:21;a",
$1:function(a){return this.a.$1(H.f(a,"$isI"))}},
aU:{"^":"c;a",
b1:function(a){var z,y
z=$.$get$bI()
if(z.a===0){for(y=0;y<262;++y)z.j(0,C.C[y],W.hc())
for(y=0;y<12;++y)z.j(0,C.i[y],W.hd())}},
V:function(a){return $.$get$cV().u(0,W.au(a))},
M:function(a,b,c){var z,y,x
z=W.au(a)
y=$.$get$bI()
x=y.h(0,H.b(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return H.h3(x.$4(a,b,c,this))},
$isX:1,
l:{
cU:function(a){var z,y
z=document.createElement("a")
y=new W.ft(z,window.location)
y=new W.aU(y)
y.b1(a)
return y},
iD:[function(a,b,c,d){H.f(a,"$isB")
H.p(b)
H.p(c)
H.f(d,"$isaU")
return!0},"$4","hc",16,0,12],
iE:[function(a,b,c,d){var z,y,x,w,v
H.f(a,"$isB")
H.p(b)
H.p(c)
z=H.f(d,"$isaU").a
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","hd",16,0,12]}},
M:{"^":"c;$ti",
gv:function(a){return new W.cc(a,this.gk(a),-1,[H.bk(this,a,"M",0)])}},
cq:{"^":"c;a",
V:function(a){return C.a.a2(this.a,new W.el(a))},
M:function(a,b,c){return C.a.a2(this.a,new W.ek(a,b,c))},
$isX:1},
el:{"^":"h:6;a",
$1:function(a){return H.f(a,"$isX").V(this.a)}},
ek:{"^":"h:6;a,b,c",
$1:function(a){return H.f(a,"$isX").M(this.a,this.b,this.c)}},
fu:{"^":"c;",
b2:function(a,b,c,d){var z,y,x
this.a.D(0,c)
z=b.am(0,new W.fv())
y=b.am(0,new W.fw())
this.b.D(0,z)
x=this.c
x.D(0,C.E)
x.D(0,y)},
V:function(a){return this.a.u(0,W.au(a))},
M:["b_",function(a,b,c){var z,y
z=W.au(a)
y=this.c
if(y.u(0,H.b(z)+"::"+b))return this.d.bk(c)
else if(y.u(0,"*::"+b))return this.d.bk(c)
else{y=this.b
if(y.u(0,H.b(z)+"::"+b))return!0
else if(y.u(0,"*::"+b))return!0
else if(y.u(0,H.b(z)+"::*"))return!0
else if(y.u(0,"*::*"))return!0}return!1}],
$isX:1},
fv:{"^":"h:7;",
$1:function(a){return!C.a.u(C.i,H.p(a))}},
fw:{"^":"h:7;",
$1:function(a){return C.a.u(C.i,H.p(a))}},
fy:{"^":"fu;e,a,b,c,d",
M:function(a,b,c){if(this.b_(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(a.getAttribute("template")==="")return this.e.u(0,b)
return!1},
l:{
d2:function(){var z,y,x,w,v
z=P.d
y=P.cl(C.h,z)
x=H.i(C.h,0)
w=H.e(new W.fz(),{func:1,ret:z,args:[x]})
v=H.r(["TEMPLATE"],[z])
y=new W.fy(y,P.b6(null,null,null,z),P.b6(null,null,null,z),P.b6(null,null,null,z),null)
y.b2(null,new H.W(C.h,w,[x,z]),v,null)
return y}}},
fz:{"^":"h:22;",
$1:function(a){return"TEMPLATE::"+H.b(H.p(a))}},
fx:{"^":"c;",
V:function(a){var z=J.o(a)
if(!!z.$iscw)return!1
z=!!z.$isw
if(z&&W.au(a)==="foreignObject")return!1
if(z)return!0
return!1},
M:function(a,b,c){if(b==="is"||C.b.aU(b,"on"))return!1
return this.V(a)},
$isX:1},
cc:{"^":"c;a,b,c,0d,$ti",
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.dt(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gq:function(){return this.d}},
eV:{"^":"c;a",$isaf:1,$iscQ:1,l:{
eW:function(a){if(a===window)return H.f(a,"$iscQ")
else return new W.eV(a)}}},
X:{"^":"c;"},
ft:{"^":"c;a,b",$isit:1},
d4:{"^":"c;a",
ao:function(a){new W.fF(this).$2(a,null)},
X:function(a,b){if(b==null)J.c0(a)
else b.removeChild(a)},
bg:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.dx(a)
x=y.gav().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.T(t)}v="element unprintable"
try{v=J.as(a)}catch(t){H.T(t)}try{u=W.au(a)
this.bf(H.f(a,"$isB"),b,z,v,u,H.f(y,"$isD"),H.p(x))}catch(t){if(H.T(t) instanceof P.a8)throw t
else{this.X(a,b)
window
s="Removing corrupted element "+H.b(v)
if(typeof console!="undefined")window.console.warn(s)}}},
bf:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.X(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")window.console.warn(z)
return}if(!this.a.V(a)){this.X(a,b)
window
z="Removing disallowed element <"+H.b(e)+"> from "+H.b(b)
if(typeof console!="undefined")window.console.warn(z)
return}if(g!=null)if(!this.a.M(a,"is",g)){this.X(a,b)
window
z="Removing disallowed type extension <"+H.b(e)+' is="'+g+'">'
if(typeof console!="undefined")window.console.warn(z)
return}z=f.gG()
y=H.r(z.slice(0),[H.i(z,0)])
for(x=f.gG().length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.m(y,x)
w=y[x]
if(!this.a.M(a,J.dD(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.b(e)+" "+w+'="'+H.b(z.getAttribute(w))+'">'
if(typeof console!="undefined")window.console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.o(a).$iscB)this.ao(a.content)},
$isij:1},
fF:{"^":"h:23;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.bg(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.X(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.dz(z)}catch(w){H.T(w)
v=H.f(z,"$isj")
if(x){u=v.parentNode
if(u!=null)u.removeChild(v)}else a.removeChild(v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=H.f(y,"$isj")}}},
fc:{"^":"y+C;"},
fd:{"^":"fc+M;"},
fl:{"^":"y+C;"},
fm:{"^":"fl+M;"},
fH:{"^":"y+C;"},
fI:{"^":"fH+M;"}}],["","",,P,{"^":"",
h7:function(a){var z,y
z=J.o(a)
if(!!z.$isbt){y=z.gah(a)
if(y.constructor===Array)if(typeof CanvasPixelArray!=="undefined"){y.constructor=CanvasPixelArray
y.BYTES_PER_ELEMENT=1}return a}return new P.fE(a.data,a.height,a.width)},
fE:{"^":"c;ah:a>,b,c",$isbt:1}}],["","",,P,{"^":"",iv:{"^":"I;0aM:target=","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",
cW:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ff:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
fe:{"^":"c;",
aJ:function(a){if(typeof a!=="number")return a.bD()
if(a<=0||a>4294967296)throw H.a(P.eq("max must be in range 0 < max \u2264 2^32, was "+a))
return Math.random()*a>>>0}},
a3:{"^":"c;m:a>,n:b>,$ti",
i:function(a){return"Point("+H.b(this.a)+", "+H.b(this.b)+")"},
H:function(a,b){var z,y,x
if(b==null)return!1
z=H.aF(b,"$isa3",[P.q],null)
if(!z)return!1
z=this.a
y=J.a_(b)
x=y.gm(b)
if(z==null?x==null:z===x){z=this.b
y=y.gn(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gw:function(a){var z,y
z=J.ar(this.a)
y=J.ar(this.b)
return P.ff(P.cW(P.cW(0,z),y))},
K:function(a,b){var z,y,x,w,v
z=this.$ti
H.F(b,"$isa3",z,"$asa3")
y=this.a
x=b.a
if(typeof y!=="number")return y.K()
if(typeof x!=="number")return H.aZ(x)
w=H.i(this,0)
x=H.n(y-x,w)
y=this.b
v=b.b
if(typeof y!=="number")return y.K()
if(typeof v!=="number")return H.aZ(v)
return new P.a3(x,H.n(y-v,w),z)},
B:function(a,b){var z,y,x
z=this.a
if(typeof z!=="number")return z.B()
y=H.i(this,0)
z=H.n(z*b,y)
x=this.b
if(typeof x!=="number")return x.B()
return new P.a3(z,H.n(x*b,y),this.$ti)}}}],["","",,P,{"^":"",hJ:{"^":"w;0m:x=,0n:y=","%":"SVGFEBlendElement"},hK:{"^":"w;0m:x=,0n:y=","%":"SVGFEColorMatrixElement"},hL:{"^":"w;0m:x=,0n:y=","%":"SVGFEComponentTransferElement"},hM:{"^":"w;0m:x=,0n:y=","%":"SVGFECompositeElement"},hN:{"^":"w;0m:x=,0n:y=","%":"SVGFEConvolveMatrixElement"},hO:{"^":"w;0m:x=,0n:y=","%":"SVGFEDiffuseLightingElement"},hP:{"^":"w;0m:x=,0n:y=","%":"SVGFEDisplacementMapElement"},hQ:{"^":"w;0m:x=,0n:y=","%":"SVGFEFloodElement"},hR:{"^":"w;0m:x=,0n:y=","%":"SVGFEGaussianBlurElement"},hS:{"^":"w;0m:x=,0n:y=","%":"SVGFEImageElement"},hT:{"^":"w;0m:x=,0n:y=","%":"SVGFEMergeElement"},hU:{"^":"w;0m:x=,0n:y=","%":"SVGFEMorphologyElement"},hV:{"^":"w;0m:x=,0n:y=","%":"SVGFEOffsetElement"},hW:{"^":"w;0m:x=,0n:y=","%":"SVGFEPointLightElement"},hX:{"^":"w;0m:x=,0n:y=","%":"SVGFESpecularLightingElement"},hY:{"^":"w;0m:x=,0n:y=","%":"SVGFESpotLightElement"},hZ:{"^":"w;0m:x=,0n:y=","%":"SVGFETileElement"},i_:{"^":"w;0m:x=,0n:y=","%":"SVGFETurbulenceElement"},i0:{"^":"w;0m:x=,0n:y=","%":"SVGFilterElement"},i1:{"^":"aw;0m:x=,0n:y=","%":"SVGForeignObjectElement"},dZ:{"^":"aw;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aw:{"^":"w;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},i4:{"^":"aw;0m:x=,0n:y=","%":"SVGImageElement"},ah:{"^":"y;",$isah:1,"%":"SVGLength"},i7:{"^":"fh;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.ag(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){H.v(b)
H.f(c,"$isah")
throw H.a(P.H("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$ist:1,
$ast:function(){return[P.ah]},
$asC:function(){return[P.ah]},
$isk:1,
$ask:function(){return[P.ah]},
$isl:1,
$asl:function(){return[P.ah]},
$asM:function(){return[P.ah]},
"%":"SVGLengthList"},i9:{"^":"w;0m:x=,0n:y=","%":"SVGMaskElement"},ai:{"^":"y;",$isai:1,"%":"SVGNumber"},ik:{"^":"fo;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.a(P.ag(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){H.v(b)
H.f(c,"$isai")
throw H.a(P.H("Cannot assign element of immutable List."))},
A:function(a,b){return this.h(a,b)},
$ist:1,
$ast:function(){return[P.ai]},
$asC:function(){return[P.ai]},
$isk:1,
$ask:function(){return[P.ai]},
$isl:1,
$asl:function(){return[P.ai]},
$asM:function(){return[P.ai]},
"%":"SVGNumberList"},il:{"^":"w;0m:x=,0n:y=","%":"SVGPatternElement"},im:{"^":"dZ;0m:x=,0n:y=","%":"SVGRectElement"},cw:{"^":"w;",$iscw:1,"%":"SVGScriptElement"},w:{"^":"B;",
F:function(a,b,c,d){var z,y,x,w,v,u
z=H.r([],[W.X])
C.a.t(z,W.cU(null))
C.a.t(z,W.d2())
C.a.t(z,new W.fx())
c=new W.d4(new W.cq(z))
y='<svg version="1.1">'+H.b(b)+"</svg>"
z=document
x=z.body
w=(x&&C.l).bo(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.R(w)
u=z.gS(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
$isw:1,
"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},ip:{"^":"aw;0m:x=,0n:y=","%":"SVGSVGElement"},eE:{"^":"aw;","%":"SVGTextPathElement;SVGTextContentElement"},is:{"^":"eE;0m:x=,0n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},iu:{"^":"aw;0m:x=,0n:y=","%":"SVGUseElement"},fg:{"^":"y+C;"},fh:{"^":"fg+M;"},fn:{"^":"y+C;"},fo:{"^":"fn+M;"}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,T,{"^":"",
c8:function(a){return P.b7(4,new T.dL(C.b.ap(T.bW(a,null),1)),!0,P.q)},
de:function(a,b){var z,y,x,w,v,u,t,s
z=T.c8(a)
y=z.length
if(0>=y)return H.m(z,0)
x=z[0]
if(1>=y)return H.m(z,1)
w=z[1]
if(2>=y)return H.m(z,2)
v=z[2]
y=C.j.gG()
u=[P.D,P.d,[P.z,,]]
t=H.S(y,"k",0)
u=H.ef(y,H.e(new T.h4(x,w,v),{func:1,ret:u,args:[t]}),t,u)
s=P.ed(u,!0,H.S(u,"k",0))
u=H.i(s,0)
t=H.e(new T.h5(),{func:1,ret:P.u,args:[u,u]})
H.ey(s,t,u)
y=C.a.a_(s,0,b)
u=P.d
t=H.i(y,0)
return new H.W(y,H.e(new T.h6(),{func:1,ret:u,args:[t]}),[t,u]).O(0)},
iG:[function(a){return C.b.Y(C.c.Z(J.dC(H.b0(a)),16),2,"0")},"$1","dr",4,0,10],
fT:function(a){var z,y,x,w,v
z=$.$get$aW()
y=P.d
z=H.r(H.ao(a,z,"").split(","),[y])
x=P.q
w=H.i(z,0)
v=new H.W(z,H.e(P.bg(),{func:1,ret:x,args:[w]}),[w,x]).O(0)
if(v.length!==3||C.a.a2(v,new T.fU()))throw H.a(P.J("Unrecognized color: '"+a+"'."))
z=H.i(v,0)
return("#"+new H.W(v,H.e(T.dr(),{func:1,ret:y,args:[z]}),[z,y]).N(0)+"FF").toUpperCase()},
fV:function(a){var z,y,x,w,v
z=$.$get$aW()
y=P.d
z=H.r(H.ao(a,z,"").split(","),[y])
x=P.q
w=H.i(z,0)
v=new H.W(z,H.e(P.bg(),{func:1,ret:x,args:[w]}),[w,x]).O(0)
if(v.length!==4||C.a.a2(C.a.a_(v,0,3),new T.fW())||J.bY(C.a.ga5(v),0)||J.O(C.a.ga5(v),1))throw H.a(P.J("Unrecognized color: '"+a+"'."))
z=C.a.a_(v,0,3)
x=H.i(z,0)
return("#"+new H.W(z,H.e(T.dr(),{func:1,ret:y,args:[x]}),[x,y]).N(0)+C.b.Y(C.c.Z(C.f.W(J.bZ(C.a.ga5(v),255)),16),2,"0")).toUpperCase()},
fJ:function(a){var z,y
z={}
z.a=a
y=$.$get$bf()
a=H.ao(a,y,"")
z.a=a
if(a.length!==4)throw H.a(P.J("Unrecognized color: '"+a+"'."))
return("#"+C.a.N(P.b7(3,new T.fK(z),!0,P.d))+"FF").toUpperCase()},
fL:function(a){var z,y
z={}
z.a=a
y=$.$get$bf()
a=H.ao(a,y,"")
z.a=a
if(a.length!==5)throw H.a(P.J("Unrecognized color: '"+a+"'."))
return("#"+C.a.N(P.b7(4,new T.fM(z),!0,P.d))).toUpperCase()},
d5:function(a){var z,y
z={}
z.a=a
y=$.$get$bf()
a=H.ao(a,y,"")
z.a=a
if(a.length!==7)throw H.a(P.J("Unrecognized color: '"+a+"'."))
return("#"+C.a.N(P.b7(3,new T.fN(z),!0,P.d))+"FF").toUpperCase()},
d6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=$.$get$aW()
y=P.d
z=H.r(H.ao(a,z,"").split(","),[y])
x=P.q
w=H.i(z,0)
v=new H.W(z,H.e(P.bg(),{func:1,ret:x,args:[w]}),[w,x]).O(0)
z=v.length
if(z!==3)throw H.a(P.J("Unrecognized color: '"+a+"'."))
if(0>=z)return H.m(v,0)
u=v[0]
if(1>=z)return H.m(v,1)
w=v[1]
if(typeof w!=="number")return w.aR()
t=w/100
if(2>=z)return H.m(v,2)
z=v[2]
if(typeof z!=="number")return z.aR()
s=z/100
if(typeof u!=="number")return u.C()
if(u<0||u>=360)throw H.a(P.J("Unrecognized color: '"+a+"'."))
if(t<0||t>100)throw H.a(P.J("Unrecognized color: '"+a+"'."))
if(s<0||s>100)throw H.a(P.J("Unrecognized color: '"+a+"'."))
r=(1-Math.abs(2*s-1))*t
q=u/60
p=r*(1-Math.abs(C.m.aS(q,2)-1))
if(q<=1){o=p
n=r
m=0}else if(q<=2){o=r
n=p
m=0}else if(q<=3){m=p
o=r
n=0}else if(q<=4){m=r
o=p
n=0}else{if(q<=5){m=r
n=p}else{m=p
n=r}o=0}z=H.r([n,o,m],[x])
x=H.i(z,0)
return("#"+new H.W(z,H.e(new T.fP(s-r/2),{func:1,ret:y,args:[x]}),[x,y]).N(0)+"FF").toUpperCase()},
bW:function(a,b){var z,y,x,w,v
a=J.c2(a).toUpperCase()
z=a.length
if(0>=z)return H.m(a,0)
if(a[0]==="#")switch(z){case 4:y=T.fJ(a)
break
case 5:y=T.fL(a)
break
case 7:y=T.d5(a)
break
case 9:y=a
break
default:throw H.a(P.J("Unrecognized color: "+a))}else if(C.b.u(a,"RGBA"))y=T.fV(a)
else if(C.b.u(a,"RGB"))y=T.fT(a)
else if(C.b.u(a,"HSLA")){z=$.$get$aW()
z=H.r(H.ao(a,z,"").split(","),[P.d])
x=P.q
w=H.i(z,0)
v=new H.W(z,H.e(P.bg(),{func:1,ret:x,args:[w]}),[w,x]).O(0)
if(v.length!==4)H.a7(P.J("Unrecognized color: '"+a+"'."))
y=C.b.L(T.d6("hsl("+C.a.I(C.a.a_(v,0,3),",")+")"),0,7)+C.b.Y(C.c.Z(C.f.W(J.bZ(C.a.ga5(v),255)),16),2,"0")}else if(C.b.u(a,"HSL"))y=T.d6(a)
else{a=a.toLowerCase()
if(!C.j.aF(a))throw H.a(P.J("Unrecognized color: '"+a+"'."))
y=T.d5("#"+H.b(C.j.h(0,a)))}return b==null?y:(C.b.L(y,0,7)+C.b.Y(C.c.Z(C.m.W(b*255),16),2,"0")).toUpperCase()},
dL:{"^":"h:8;a",
$1:function(a){return P.hk(C.b.L(this.a,a*2,(a+1)*2),null,16)}},
h4:{"^":"h:24;a,b,c",
$1:function(a){var z,y,x,w
H.p(a)
z=T.c8(a)
if(0>=z.length)return H.m(z,0)
y=J.bn(z[0],this.a)
if(1>=z.length)return H.m(z,1)
x=J.bn(z[1],this.b)
if(2>=z.length)return H.m(z,2)
w=J.bn(z[2],this.c)
return P.ec(["color",a,"value",y*y+x*x+w*w],P.d,[P.z,,])}},
h5:{"^":"h:25;",
$2:function(a,b){var z=[P.d,[P.z,,]]
H.F(a,"$isD",z,"$asD")
H.F(b,"$isD",z,"$asD")
return J.dv(a.h(0,"value"),b.h(0,"value"))}},
h6:{"^":"h:26;",
$1:function(a){return J.as(H.F(a,"$isD",[P.d,[P.z,,]],"$asD").h(0,"color"))}},
fU:{"^":"h:9;",
$1:function(a){H.b0(a)
if(typeof a!=="number")return a.C()
return a<0||a>255.5}},
fW:{"^":"h:9;",
$1:function(a){H.b0(a)
if(typeof a!=="number")return a.C()
return a<0||a>255.5}},
fK:{"^":"h:2;a",
$1:function(a){var z,y
z=this.a.a
y=a+1
if(y>=z.length)return H.m(z,y)
return C.b.B(z[y],2)}},
fM:{"^":"h:2;a",
$1:function(a){var z,y
z=this.a.a
y=a+1
if(y>=z.length)return H.m(z,y)
return C.b.B(z[y],2)}},
fN:{"^":"h:2;a",
$1:function(a){var z=a*2
return C.b.L(this.a.a,z+1,z+3)}},
fP:{"^":"h:10;a",
$1:function(a){H.b0(a)
if(typeof a!=="number")return a.J()
return C.b.Y(C.c.Z(C.f.W((a+this.a)*255),16),2,"0")}}}],["","",,F,{"^":"",
dm:function(){var z,y,x,w
z={}
y=document
x=H.f(y.querySelector("#output"),"$isaK")
z.a=null
z.b=null
z.c=!0
z.d=null
z.e=null
z.f=null
z.r=null
z.x=0
z.y=0
w=y.createElement("img")
w.src="lake.png"
y=W.I
W.bb(w,"load",H.e(new F.hs(z,new F.ht(z),x,C.t),{func:1,ret:-1,args:[y]}),!1,y)},
ht:{"^":"h:27;a",
$2:function(a,b){var z,y,x,w,v
z=this.a
y=z.d
if(typeof b!=="number")return b.B()
if(typeof y!=="number")return H.aZ(y)
if(typeof a!=="number")return a.B()
x=H.r([0,1,2],[P.u])
w=P.q
v=H.i(x,0)
return new H.W(x,H.e(new F.hu(z,b*y*4+a*4),{func:1,ret:w,args:[v]}),[v,w])}},
hu:{"^":"h:8;a,b",
$1:function(a){var z,y
H.v(a)
z=J.dy(this.a.f)
if(typeof a!=="number")return H.aZ(a)
y=this.b+a
if(y<0||y>=z.length)return H.m(z,y)
return z[y]}},
hs:{"^":"h:28;a,b,c,d",
$1:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=H.bT(J.dB(a),"$iscd")
y=z.width
x=this.a
x.d=y
w=z.height
x.e=w
v=document
u=v.createElement("canvas")
if(y!=null)u.width=y
if(w!=null)u.height=w
u.getContext("2d").drawImage(z,0,0)
t=W.ay
s=this.b
r={func:1,ret:-1,args:[t]}
W.bb(u,"click",H.e(new F.hp(x,s),r),!1,t)
x.a=u
x.f=P.h7(u.getContext("2d").getImageData(0,0,x.d,x.e))
q=v.createElement("div")
C.e.R(q,"0 / 0")
q.classList.add("display")
x.r=q
p=v.createElement("div")
p.classList.add("my-button")
C.e.R(p,"Start")
W.bb(p,"click",H.e(new F.hq(x),r),!1,t)
x.b=p
t=this.c
new W.eT(t,t.children).D(0,H.r([p,x.r,x.a],[W.B]))
t=x.a
t.toString
t=t.getContext("2d")
t.font="10pt Arial"
t.textAlign="center"
t.textBaseline="middle"
P.eF(P.dR(0,0,0,0,0,1),new F.hr(x,this.d,s))}},
hp:{"^":"h:11;a,b",
$1:function(a){var z,y
H.f(a,"$isay")
z=J.a_(a)
y=C.a.gaG(T.de("rgb("+J.c_(this.b.$2(H.v(z.gaK(a).a),H.v(z.gaK(a).b)),",")+")",3))
z=this.a.r;(z&&C.e).R(z,y)
H.hy(H.b(y))}},
hq:{"^":"h:11;a",
$1:function(a){var z,y
H.f(a,"$isay")
z=this.a
if(z.c){y=H.bT(W.aV(a.target),"$isaK");(y&&C.e).R(y,"Pause")
z.c=!1}else{y=H.bT(W.aV(a.target),"$isaK");(y&&C.e).R(y,"Continue")
z.c=!0}}},
hr:{"^":"h:29;a,b,c",
$1:function(a){var z,y,x,w,v,u
H.f(a,"$isaj")
z=this.a
if(!z.c){for(y=this.b,x=this.c,a=0;a<100;++a){w=y.aJ(z.d)
v=y.aJ(z.e)
if(C.a.gaG(T.de("rgb("+J.c_(x.$2(w,v),",")+")",3))==="lightblue"){++z.x
u=z.a
u.toString
u=u.getContext("2d")
u.fillStyle=T.bW("darkgreen",0.5)
u.fillText("o",w,v)}else{u=z.a
u.toString
u=u.getContext("2d")
u.fillStyle=T.bW("darkred",0.5)
u.fillText("x",w,v)}++z.y}y=z.r;(y&&C.e).R(y,""+z.x+" / "+z.y)}}}},1]]
setupProgram(dart,0,0)
J.o=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cf.prototype
return J.ce.prototype}if(typeof a=="string")return J.aO.prototype
if(a==null)return J.e4.prototype
if(typeof a=="boolean")return J.e3.prototype
if(a.constructor==Array)return J.aM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aP.prototype
return a}if(a instanceof P.c)return a
return J.bj(a)}
J.an=function(a){if(typeof a=="string")return J.aO.prototype
if(a==null)return a
if(a.constructor==Array)return J.aM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aP.prototype
return a}if(a instanceof P.c)return a
return J.bj(a)}
J.bi=function(a){if(a==null)return a
if(a.constructor==Array)return J.aM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aP.prototype
return a}if(a instanceof P.c)return a
return J.bj(a)}
J.aY=function(a){if(typeof a=="number")return J.aN.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aT.prototype
return a}
J.dg=function(a){if(typeof a=="number")return J.aN.prototype
if(typeof a=="string")return J.aO.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aT.prototype
return a}
J.dh=function(a){if(typeof a=="string")return J.aO.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aT.prototype
return a}
J.a_=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aP.prototype
return a}if(a instanceof P.c)return a
return J.bj(a)}
J.aq=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.o(a).H(a,b)}
J.O=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aY(a).P(a,b)}
J.bY=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aY(a).C(a,b)}
J.bZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dg(a).B(a,b)}
J.bn=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aY(a).K(a,b)}
J.dt=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.hm(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.an(a).h(a,b)}
J.du=function(a,b,c,d){return J.a_(a).aC(a,b,c,d)}
J.dv=function(a,b){return J.dg(a).a3(a,b)}
J.dw=function(a,b){return J.bi(a).A(a,b)}
J.dx=function(a){return J.a_(a).gbl(a)}
J.dy=function(a){return J.a_(a).gah(a)}
J.ar=function(a){return J.o(a).gw(a)}
J.aJ=function(a){return J.bi(a).gv(a)}
J.ae=function(a){return J.an(a).gk(a)}
J.dz=function(a){return J.a_(a).gbt(a)}
J.dA=function(a){return J.a_(a).gbz(a)}
J.dB=function(a){return J.a_(a).gaM(a)}
J.c_=function(a,b){return J.bi(a).I(a,b)}
J.c0=function(a){return J.bi(a).bv(a)}
J.dC=function(a){return J.aY(a).W(a)}
J.c1=function(a){return J.aY(a).bB(a)}
J.dD=function(a){return J.dh(a).bC(a)}
J.as=function(a){return J.o(a).i(a)}
J.c2=function(a){return J.dh(a).aP(a)}
I.ac=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.l=W.b2.prototype
C.e=W.aK.prototype
C.u=J.y.prototype
C.a=J.aM.prototype
C.m=J.ce.prototype
C.c=J.cf.prototype
C.f=J.aN.prototype
C.b=J.aO.prototype
C.B=J.aP.prototype
C.G=W.ej.prototype
C.p=J.eo.prototype
C.q=W.eD.prototype
C.k=J.aT.prototype
C.r=new P.en()
C.t=new P.fe()
C.d=new P.fp()
C.v=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.w=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.n=function(hooks) { return hooks; }

C.x=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.y=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.z=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.A=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.o=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.C=H.r(I.ac(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.d])
C.D=H.r(I.ac(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"]),[P.d])
C.E=H.r(I.ac([]),[P.d])
C.h=H.r(I.ac(["bind","if","ref","repeat","syntax"]),[P.d])
C.i=H.r(I.ac(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.d])
C.F=H.r(I.ac(["antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"]),[P.d])
C.j=new H.dO(140,{antiquewhite:"FAEBD7",aqua:"00FFFF",aquamarine:"7FFFD4",azure:"F0FFFF",beige:"F5F5DC",bisque:"FFE4C4",black:"000000",blanchedalmond:"FFEBCD",blue:"0000FF",blueviolet:"8A2BE2",brown:"A52A2A",burlywood:"DEB887",cadetblue:"5F9EA0",chartreuse:"7FFF00",chocolate:"D2691E",coral:"FF7F50",cornflowerblue:"6495ED",cornsilk:"FFF8DC",crimson:"DC143C",cyan:"00FFFF",darkblue:"00008B",darkcyan:"008B8B",darkgoldenrod:"B8860B",darkgray:"A9A9A9",darkgreen:"006400",darkkhaki:"BDB76B",darkmagenta:"8B008B",darkolivegreen:"556B2F",darkorange:"FF8C00",darkorchid:"9932CC",darkred:"8B0000",darksalmon:"E9967A",darkseagreen:"8FBC8F",darkslateblue:"483D8B",darkslategray:"2F4F4F",darkturquoise:"00CED1",darkviolet:"9400D3",deeppink:"FF1493",deepskyblue:"00BFFF",dimgray:"696969",dodgerblue:"1E90FF",firebrick:"B22222",floralwhite:"FFFAF0",forestgreen:"228B22",fuchsia:"FF00FF",gainsboro:"DCDCDC",ghostwhite:"F8F8FF",gold:"FFD700",goldenrod:"DAA520",gray:"808080",green:"008000",greenyellow:"ADFF2F",honeydew:"F0FFF0",hotpink:"FF69B4",indianred:"CD5C5C",indigo:"4B0082",ivory:"FFFFF0",khaki:"F0E68C",lavender:"E6E6FA",lavenderblush:"FFF0F5",lawngreen:"7CFC00",lemonchiffon:"FFFACD",lightblue:"ADD8E6",lightcoral:"F08080",lightcyan:"E0FFFF",lightgoldenrodyellow:"FAFAD2",lightgray:"D3D3D3",lightgreen:"90EE90",lightpink:"FFB6C1",lightsalmon:"FFA07A",lightseagreen:"20B2AA",lightskyblue:"87CEFA",lightslategray:"778899",lightsteelblue:"B0C4DE",lightyellow:"FFFFE0",lime:"00FF00",limegreen:"32CD32",linen:"FAF0E6",magenta:"FF00FF",maroon:"800000",mediumaquamarine:"66CDAA",mediumblue:"0000CD",mediumorchid:"BA55D3",mediumpurple:"9370DB",mediumseagreen:"3CB371",mediumslateblue:"7B68EE",mediumspringgreen:"00FA9A",mediumturquoise:"48D1CC",mediumvioletred:"C71585",midnightblue:"191970",mintcream:"F5FFFA",mistyrose:"FFE4E1",moccasin:"FFE4B5",navajowhite:"FFDEAD",navy:"000080",oldlace:"FDF5E6",olive:"808000",olivedrab:"6B8E23",orange:"FFA500",orangered:"FF4500",orchid:"DA70D6",palegoldenrod:"EEE8AA",palegreen:"98FB98",paleturquoise:"AFEEEE",palevioletred:"DB7093",papayawhip:"FFEFD5",peachpuff:"FFDAB9",peru:"CD853F",pink:"FFC0CB",plum:"DDA0DD",powderblue:"B0E0E6",purple:"800080",rebeccapurple:"663399",red:"FF0000",rosybrown:"BC8F8F",royalblue:"4169E1",saddlebrown:"8B4513",salmon:"FA8072",sandybrown:"F4A460",seagreen:"2E8B57",seashell:"FFF5EE",sienna:"A0522D",silver:"C0C0C0",skyblue:"87CEEB",slateblue:"6A5ACD",slategray:"708090",snow:"FFFAFA",springgreen:"00FF7F",steelblue:"4682B4",tan:"D2B48C",teal:"008080",thistle:"D8BFD8",tomato:"FF6347",turquoise:"40E0D0",violet:"EE82EE",wheat:"F5DEB3",white:"FFFFFF",whitesmoke:"F5F5F5",yellow:"FFFF00",yellowgreen:"9ACD32"},C.F,[P.d,P.d])
$.U=0
$.at=null
$.c5=null
$.bL=!1
$.dj=null
$.db=null
$.dq=null
$.bh=null
$.bl=null
$.bS=null
$.al=null
$.aC=null
$.aD=null
$.bM=!1
$.x=C.d
$.a1=null
$.br=null
$.cb=null
$.ca=null
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["c9","$get$c9",function(){return H.di("_$dart_dartClosure")},"bx","$get$bx",function(){return H.di("_$dart_js")},"cD","$get$cD",function(){return H.Y(H.ba({
toString:function(){return"$receiver$"}}))},"cE","$get$cE",function(){return H.Y(H.ba({$method$:null,
toString:function(){return"$receiver$"}}))},"cF","$get$cF",function(){return H.Y(H.ba(null))},"cG","$get$cG",function(){return H.Y(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cK","$get$cK",function(){return H.Y(H.ba(void 0))},"cL","$get$cL",function(){return H.Y(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cI","$get$cI",function(){return H.Y(H.cJ(null))},"cH","$get$cH",function(){return H.Y(function(){try{null.$method$}catch(z){return z.message}}())},"cN","$get$cN",function(){return H.Y(H.cJ(void 0))},"cM","$get$cM",function(){return H.Y(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bH","$get$bH",function(){return P.eN()},"aE","$get$aE",function(){return[]},"cV","$get$cV",function(){return P.cl(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],P.d)},"bI","$get$bI",function(){return P.eb(P.d,P.aL)},"aW","$get$aW",function(){return P.cv("[^0-9,.]",!0,!1)},"bf","$get$bf",function(){return P.cv("[^#0-9a-fA-F]",!0,!1)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.A},{func:1,ret:-1},{func:1,ret:P.d,args:[P.u]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.A,args:[,]},{func:1,ret:P.G,args:[W.X]},{func:1,ret:P.G,args:[P.d]},{func:1,ret:P.u,args:[P.u]},{func:1,ret:P.G,args:[P.q]},{func:1,ret:P.d,args:[P.q]},{func:1,ret:P.A,args:[W.ay]},{func:1,ret:P.G,args:[W.B,P.d,P.d,W.aU]},{func:1,args:[,P.d]},{func:1,args:[P.d]},{func:1,ret:P.A,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.c],opt:[P.P]},{func:1,ret:P.A,args:[,],opt:[,]},{func:1,ret:[P.a4,,],args:[,]},{func:1,ret:P.A,args:[,,]},{func:1,ret:P.G,args:[W.j]},{func:1,ret:-1,args:[W.I]},{func:1,ret:P.d,args:[P.d]},{func:1,ret:-1,args:[W.j,W.j]},{func:1,ret:[P.D,P.d,[P.z,,]],args:[P.d]},{func:1,ret:P.u,args:[[P.D,P.d,[P.z,,]],[P.D,P.d,[P.z,,]]]},{func:1,ret:P.d,args:[[P.D,P.d,[P.z,,]]]},{func:1,ret:[P.k,P.q],args:[P.u,P.u]},{func:1,ret:P.A,args:[W.I]},{func:1,ret:P.A,args:[P.aj]},{func:1,ret:P.q,args:[P.d],opt:[{func:1,ret:P.q,args:[P.d]}]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.hC(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.ac=a.ac
Isolate.bQ=a.bQ
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.dm,[])
else F.dm([])})})()
//# sourceMappingURL=main.dart.js.map
