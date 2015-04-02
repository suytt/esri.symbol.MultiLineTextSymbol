require(["esri/layers/LabelLayer"], function(ll)
{
	if( typeof esri.layers.LabelLayer.prototype._addLabel == 'function' )
	{
		esri.layers.LabelLayer.prototype._addLabel2 = esri.layers.LabelLayer.prototype._addLabel;
		esri.layers.LabelLayer.prototype._addLabel = function(a,b,c,e,g,k,m)
		{
			// replace \n by <br>
			a = a.replace(/\n/g, "<br />");
			this._addLabel2(a,b,c,e,g,k,m);
		}
	}
});

require(["esri/symbols/TextSymbol", "dojox/gfx/svg"], function(ts, svg)
{
	if( typeof dojox.gfx.svg.Text.prototype.setShape == 'function' )
	{
		dojox.gfx.svg.Text.prototype.setShape = function(p)
		{
			this.shape = dojox.gfx.makeParameters(this.shape, p);
			this.bbox = null;
			var r = this.rawNode, s = this.shape;
			r.setAttribute("x", s.x);
			r.setAttribute("y", s.y);
			r.setAttribute("text-anchor", s.align);
			r.setAttribute("text-decoration", s.decoration);
			r.setAttribute("rotate", s.rotated ? 90 : 0);
			r.setAttribute("kerning", s.kerning ? "auto" : 0);
			r.setAttribute("text-rendering", "optimizeLegibility");
			
			while(r.firstChild)
				r.removeChild(r.firstChild);

			if(s.text)
			{ 
				var texts = s.text.replace(/<br\s*\/?>/ig, "\n").split("\n");
				var lineHeight = 1.1 * parseInt(document.defaultView.getComputedStyle(r, "").getPropertyValue("font-size"), 10); 
				if( isNaN(lineHeight) || !isFinite(lineHeight) )
					lineHeight = 15;
					
				for(var i = 0, n = texts.length; i < n; i++)
				{ 
					var tspan = (document.createElementNS ? document.createElementNS(dojox.gfx.svg.xmlns.svg, "tspan") : document.createElement("tspan"));
					tspan.setAttribute("dy", i ? lineHeight : -(texts.length-1)*lineHeight/2); 
					tspan.setAttribute("x", s.x);
					tspan.appendChild((dojox.gfx.useSvgWeb ? document.createTextNode(texts[i], true) : document.createTextNode(texts[i]))); 
					r.appendChild(tspan);
				}
			}

			return this;
		}
	}
});
