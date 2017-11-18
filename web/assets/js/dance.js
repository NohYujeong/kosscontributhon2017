    // �� �⵵�� ��ȣ�� ������ �Է� �迭    
   var d_array = [20,30,24,66,40,10,80];    
   // ���൵ ��Ʈ ���ʰ� ����
    var percent = d_array[0];
    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);

    var w=300,h=320;

    var outerRadius=(w/2)-10;
    var innerRadius=outerRadius-8;

    // color[0] -> ���൵ ����
    var color = ['#66c2a5','#2a3a46','#202b33'];
    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI);

    //The circle is following this
    var arcDummy=d3.svg.arc()
            .innerRadius((outerRadius-innerRadius)/2+innerRadius)
            .outerRadius((outerRadius-innerRadius)/2+innerRadius)
            .startAngle(0);


    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);

// �ش� div id ���� genre name
    var svg=d3.select("#dance")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2+','+h/2+')'
            });


    //background
    var path=svg.append('path')
            .attr({
                d:arc
            })
            .style({
                fill:color[1]
            });


    var pathForeground=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine
            })
            .style({
                fill:color[0]
            });

    //Dummy Arc for Circle
    var pathDummy=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcDummy
            }).style({
                fill:color[0]
            });

    var endCircle=svg.append('circle')
            .attr({
                r:12,
                transform:'translate(0,'+ (-outerRadius+15) +')'
            })
            .style({
                stroke:color[0],
                'stroke-width':8,
                fill:color[2]
            });

    var middleTextCount=svg.append('text')
            .datum(0)
            .text(function(d){
                return d+'%';
            })

            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:25,
                dx:0
            })
            .style({
                fill:color[0],
                'font-size':'80px'

            });


    var arcTweenOld=function(transition, percent,oldValue) {
        transition.attrTween("d", function (d) {

            var newAngle=(percent/100)*(2*Math.PI);

            var interpolate = d3.interpolate(d.endAngle, newAngle);

            var interpolateCount = d3.interpolate(oldValue, percent);


            return function (t) {
                d.endAngle = interpolate(t);
                var pathForegroundCircle = arcLine(d);

                middleTextCount.text(Math.floor(interpolateCount(t))+'%');

                var pathDummyCircle = arcDummy(d);
                var coordinate = pathDummyCircle.split("L")[1].split("A")[0];

                endCircle.attr('transform', 'translate(' + coordinate+ ')');

                return pathForegroundCircle;
            };
        });
    };

    // ���൵ ��Ʈ �ִϸ��̼� ���� �Լ�
    var oldValue=0;
    var i =1;
    var animate=function(){
      if(i==1){
        percent=d_array[0];
        
      }
        pathForeground.transition()
                .duration(750)
                .ease('cubic')
                .call(arcTweenOld,percent,oldValue);
        oldValue=percent;
        percent=d_array[i];
        document.all("danceyear").innerHTML=2010+i;

        i++;      
        setTimeout(animate,3000);
        if(i==d_array.length+1){
          i=1;
          }
    };

    setTimeout(animate,0);