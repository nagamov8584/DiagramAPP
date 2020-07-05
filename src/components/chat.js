import CanvasJSReact from '../assets/canvasjs.react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import {ListGroup,  Navbar, MenuItem, Nav, Form, NavDropdown, Dropdown, FormControl, Button } from 'react-bootstrap';
var React = require('react');
var Component = React.Component;

// var CanvasJSReact = require('../canvasjs.react');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var colors = ["green", "yellow", "blue", "purple"];
var graphTmpData = [
	{
			type: "line",
			color: "",
			toolTipContent: "Every values of Timestamp is {x}: {y}%",
			dataPoints: []
	}
]
var TempData = []
var graDisData = [];
var nCallCounter = 0;
var strFlag = 'enabled';
var xPosCount = 1;
var roundCount = 1;
var graphYaxisTitle =[]

class Diagram extends Component{
	constructor(props) {
		super(props);
		this.state = {
		  siteMaps: [],
		  curSiteName: "SITE NAMES",
		  curPoints: "POINTS",
		  equipments: [],
		  tmpgraphData:[],
		  graphData: [],
		  graphDataTitle: [],
		  disable: false
		};
	  } 
	  
	disableManager()
	{

		setInterval(this.disableFunc, 60000);
	}

	disableFunc()
	{
		if(strFlag != 'disabled')
		{
			nCallCounter = nCallCounter + 60000;
			if(nCallCounter == 1800000)
			{
				strFlag = 'disabled';
				nCallCounter = 0;
				this.setState({disable:true});
			}
		}
		else
		{
			if(nCallCounter == 120000)
			{
				strFlag = 'enabled';
				nCallCounter = 0;
				this.setState({disable:false});
			}
			else{
				nCallCounter = nCallCounter + 60000;
			}
			
		}
		
	}
	callAPI() 
	{
		fetch("http://localhost:9000/siteMaster")
				.then(response => response.json())
				.then((data) => 
				{
					editTodo: 
					{
						this.setState({siteMaps: data})
						this.setState({curSiteName: data[0].sitename})
					}

					fetch("http://localhost:9000/equipments?siteName=" + data[0].sitename)
						.then(response => response.json())
						.then((data) => 
						{
							editTodo: 
							{
								this.setState({equipments: data})
							}
						});
				});
		
				this.getGraphDataFromDB();

	}
	onClickHandler = event => {
		const value = event.target.innerHTML;
		this.setState({ curSiteName : value });
		fetch("http://localhost:9000/equipments?siteName=" + value)
				.then(response => response.json())
				.then((data) => 
				{
					editTodo: 
					{
						this.setState({equipments: data})
					}
					console.log(this.state.equipments);
				});
	}
	onPointClickHandler = event => {
		const value = event.target.innerHTML;
		this.setState({curPoints : value});
		switch(value)
		{
			case 'Value Check':
				
				graphYaxisTitle =
				[
					{
						
						title: "Value",
						titleFontColor:"green",
						includeZero: false
					}
				]
				this.setState({graphDataTitle:graphYaxisTitle});
				this.makingJsonStructure(this.state.tmpgraphData, 1);
				break;
			case 'Double Check':
				// alert("this is 2");
				graphYaxisTitle =
				[
					{
						
						title: "Value",
						titleFontColor:"green",
						includeZero: false
					},
					{
						title: "static1",
						titleFontColor:"yellow",
						includeZero: false
					}
				]

				this.setState({graphDataTitle:graphYaxisTitle});
				this.makingJsonStructure(this.state.tmpgraphData, 2);

				break;
			case 'Multiple Check':
				// alert("this is 3");
				graphYaxisTitle =
				[
					{
						
						title: "Value",
						titleFontColor:"green",
						includeZero: false
					},
					{
						title: "static1",
						titleFontColor:"yellow",
						includeZero: false,
						suffix: "%"
					},
					{
						title: "static2",
						titleFontColor:"blue",
						includeZero: false,
						suffix: "%"
					}
				]

				this.setState({graphDataTitle:graphYaxisTitle});
				this.makingJsonStructure(this.state.tmpgraphData, 3);
				break;
			case 'Total Check':
				graphYaxisTitle =
				[
					{
						
						title: "Value",
						titleFontColor:"green",
						includeZero: false
					},
					{
						title: "static1",
						titleFontColor:"yellow",
						includeZero: false,
						suffix: "%"
					},
					{
						title: "static2",
						titleFontColor:"blue",
						includeZero: false,
						suffix: "%"
					},
					{
						title: "static3",
						titleFontColor:"purple",
						includeZero: false,
						suffix: "%"
					}
				]

				this.setState({graphDataTitle:graphYaxisTitle});
				this.makingJsonStructure(this.state.tmpgraphData, 4);
				break;
			case 'NONE':
				this.setState({graphDataTitle: [{"":""}]})
				graDisData = [];
				this.setState({graphData: graDisData});
		}
		// alert(value);
		// this.setState({ curSiteName : value });
		// fetch("http://localhost:9000/equipments?siteName=" + value)
		// 		.then(response => response.json())
		// 		.then((data) => 
		// 		{
		// 			editTodo: 
		// 			{
		// 				this.setState({equipments: data})
		// 			}
		// 			console.log(this.state.equipments);
		// 		});
	}
	getGraphDataFromDB()
	{
		// alert("this");
		fetch("http://localhost:9000/graph")
				.then(response => response.json())
				.then((data) => 
				{
					editTodo: 
					{
						this.setState({tmpgraphData: data})
						// console.log(this.state.tmpgraphData);
						this.makingJsonStructure(data, 1);
						graphYaxisTitle =
						[
							{
								
								title: "Value",
								titleFontColor:"green",
								includeZero: false
							}
						]
						this.setState({graphDataTitle:graphYaxisTitle});
					}
					// console.log(this.state.siteMaps);
				});
	}
	makingJsonStructure(baseData, nCount)
	{
		graDisData = [];	
			
		for(var i = 0; i < nCount; i++)
		{
			
			xPosCount = 1;
			roundCount = i + 1;
			baseData.forEach(this.myFunction);

			graDisData.push({
				type: "line",
				color: colors[i],
				toolTipContent: "Every values of Timestamp is {x}: {y}%",
				dataPoints: TempData
			});
			TempData = [];
			
		}
			this.setState({graphData : graDisData});
			roundCount = 0;
	}
	
	myFunction(item) {
		var myItem = {x:0, y:0}
		myItem.x = xPosCount;
		if(roundCount == 1)
			myItem.y = item.VALUE;
		else
			myItem.y = Math.random() * 300;
		
		TempData.push(myItem);
		xPosCount ++;

	}
	componentWillMount() 
	{
		this.callAPI();
	}
    render(){
		const tmpsiteMaps = this.state.siteMaps;
		const equips = this.state.equipments;

		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "GL_ATTESSA Daily Value Graph",
				fontColor: "red"
			},
			axisY: this.state.graphDataTitle,
			axisX: {
				title: "TimeStamp",
				interval: 1
			},
			data: this.state.graphData
		}
		// const { siteMaps } = this.state.siteMaps;
		return (
		<div>
			<fieldset disabled={this.state.disable}>
			<MDBDropdown>
				<MDBDropdownToggle caret color="blue"  style={{width:"100%", margin:"0px"}}>{this.state.curSiteName}
				</MDBDropdownToggle>
				<MDBDropdownMenu basic>
				{tmpsiteMaps.map(tmpsiteMap =>
						<MDBDropdownItem onClick={this.onClickHandler}>{tmpsiteMap.sitename}</MDBDropdownItem>
				)}
					<MDBDropdownItem divider />
					<MDBDropdownItem>ALL Sites</MDBDropdownItem>
				</MDBDropdownMenu>
			</MDBDropdown>

			<Navbar bg="primary" >
                <ListGroup horizontal style={{width: "100%"}}>
				{equips.map(equip =>
						<MDBDropdownItem  className={"equipment-nav"}>{equip.tagnum +", " +equip.protocol +", " + equip.model}</MDBDropdownItem>
				)}
                </ListGroup>
            </Navbar>
			<Navbar bg="none" style={{height:"85px"}}>
            </Navbar>
			<MDBDropdown className={"pointer"}>
				<MDBDropdownToggle caret color="blue"  >{this.state.curPoints}
				</MDBDropdownToggle>
				<MDBDropdownMenu basic >
					<MDBDropdownItem onClick={this.onPointClickHandler}>Value Check</MDBDropdownItem>
					<MDBDropdownItem onClick={this.onPointClickHandler}>Double Check</MDBDropdownItem>
					<MDBDropdownItem onClick={this.onPointClickHandler}>Multiple Check</MDBDropdownItem>
					<MDBDropdownItem onClick={this.onPointClickHandler}>Total Check</MDBDropdownItem>
					<MDBDropdownItem divider />
					<MDBDropdownItem onClick={this.onPointClickHandler}>NONE</MDBDropdownItem>
				</MDBDropdownMenu>
			</MDBDropdown>
			
			
			
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</fieldset>
		</div>
		);
    }
}
export default Diagram;
