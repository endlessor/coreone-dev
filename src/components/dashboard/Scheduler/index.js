import React from "react";
import MaterialIcon from "material-icons-react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "rc-slider";
import { hours, MAIN_COLOR } from "../../utils";

const daysHeaders = ["Mon", "Tue", "Wed", "The", "Fri", "Sat", "Sun"];
const daysHeadersNewSchedule = ["M", "T", "W", "T", "F", "S", "S"];

const temperatureMarks = {
  65: <strong className="new-scheduler-slider-mark right">65&nbsp;°</strong>,
  5: <strong className="new-scheduler-slider-mark left">5&nbsp;°</strong>
};

let times = [],
  hour = null,
  min = null;

for (hour in hours) {
  for (min = 0; min < 60; min += 15) {
    times.push(("0" + hours[hour]).slice(-2) + ":" + ("0" + min).slice(-2));
  }
}

class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    let timePoints = [];
    for (let i = 0; i < 24; i++) {
      timePoints.push({
        value: i !== 0 ? i : "12",
        type: "hour"
      });
      timePoints.push(
        {
          value: 15,
          type: "minute"
        },
        {
          value: 30,
          type: "minute"
        },
        {
          value: 45,
          type: "minute"
        }
      );
    }
    timePoints.push({
      value: "00",
      type: "hour"
    });

    this.state = {
      addRangeDialogOpened: false,
      editableItem: null,
      selectedDays: [0],
      temperature: 38,
      timeStart: "12:00",
      timeEnd: "14:00",
      timePoints,
      schedulerData: [[], [], [], [], [], [], []]
    };
  }

  removeRange(dayIndex, itemIndex) {
    let schedulerData = JSON.parse(JSON.stringify(this.state.schedulerData));
    schedulerData[dayIndex].splice(itemIndex, 1);
    this.props.updateSchedulerData(schedulerData);
    this.setState({ schedulerData });
  }

  openAddRangeDialog() {
    this.setState({
      selectedDays: [0],
      addRangeDialogOpened: true,
      editableItem: null
    });
  }

  async addRange() {
    let start = this.state.timeStart.split(":");
    start = { hours: parseInt(start[0]), minutes: parseInt(start[1]) };

    let end = this.state.timeEnd.split(":");
    end = { hours: parseInt(end[0]), minutes: parseInt(end[1]) };

    let schedulerData = JSON.parse(JSON.stringify(this.state.schedulerData));

    if (this.state.editableItem === null) {
      this.state.selectedDays.forEach(dayIndex => {
        schedulerData[dayIndex].push({
          start: start,
          end: end,
          value: this.state.temperature,
          status: true
        });
      });
    } else {
      schedulerData[this.state.editableItem[0]][
        this.state.editableItem[1]
      ].start = start;
      schedulerData[this.state.editableItem[0]][
        this.state.editableItem[1]
      ].end = end;
      schedulerData[this.state.editableItem[0]][
        this.state.editableItem[1]
      ].value = this.state.temperature;
    }

    this.props.updateSchedulerData(schedulerData);
    this.setState({
      addRangeDialogOpened: false,
      editableItem: null,
      schedulerData
    });
  }

  openEditRangeDialog(dayIndex, itemIndex) {
    let item = this.state.schedulerData[dayIndex][itemIndex];
    let start = `${item.start.hours}:${item.start.minutes}`;
    let end = `${item.end.hours}:${item.end.minutes}`;

    if (item.start.hours.toString().length < 2) {
      start = "0" + start;
    }

    if (item.start.minutes.toString().length < 2) {
      start = start + "0";
    }

    if (item.end.hours.toString().length < 2) {
      end = "0" + end;
    }

    if (item.end.minutes.toString().length < 2) {
      end = end + "0";
    }

    this.setState({
      selectedDays: [0],
      addRangeDialogOpened: true,
      temperature: item.value,
      timeStart: start,
      timeEnd: end,
      editableItem: [dayIndex, itemIndex]
    });
  }

  getRangeLeftPosition(range) {
    return `calc(${this.columnWidth *
      (range.start.hours * 4 + range.start.minutes / 15)}px + 55px)`;
  }

  getRangeWidth(range) {
    let hoursDiff = range.end.hours - range.start.hours,
      minutesDiff = range.end.minutes - range.start.minutes;

    return `calc(${this.columnWidth *
      (hoursDiff * 4 + (minutesDiff - 1) / 15)}px)`;
  }

  get columnWidth() {
    return 30;
  }

  get displayedTemperature() {
    let temp = this.state.temperature.toString(),
      digit1 = temp.slice(0, 1),
      digit2 = temp.slice(1),
      long = temp.length > 1;

    return (
      <span className="ml-3">
        <span className="temperature-slider-digit">{long ? digit1 : " "}</span>
        <span className="temperature-slider-digit">
          {long ? digit2 : digit1}
        </span>
      </span>
    );
  }

  toggleSelectedDay(dayIndex) {
    let selectedDays = this.state.selectedDays.slice();

    if (selectedDays.indexOf(dayIndex) !== -1) {
      selectedDays.splice(selectedDays.indexOf(dayIndex), 1);
    } else {
      selectedDays.push(dayIndex);
    }

    this.setState({ selectedDays });
  }

  render() {
    return (
      <div className="dashboard-card" style={{ height: 500 }}>
        <div
          onClick={() => this.openAddRangeDialog()}
          className="add-range-btn icon hover-opacity"
        >
          <MaterialIcon icon="add" />
        </div>

        <Dialog
          open={this.state.addRangeDialogOpened}
          maxWidth="xs"
          fullWidth={true}
          onClose={() => this.setState({ addRangeDialogOpened: false })}
        >
          <DialogTitle>
            {this.state.editableItem === null ? "New" : "Edit"} Schedule
          </DialogTitle>
          <div className="pl-3 pr-3 pb-3">
            {this.state.editableItem === null && (
              <div className="days d-flex justify-content-between mb-3">
                {daysHeadersNewSchedule.map((dayHeader, index) => (
                  <div
                    key={index + "_key4"}
                    onClick={() => this.toggleSelectedDay(index)}
                    className={`day hover-opacity ${
                      this.state.selectedDays.indexOf(index) !== -1
                        ? "active"
                        : ""
                    }`}
                  >
                    {dayHeader}
                  </div>
                ))}
              </div>
            )}

            <div className="pb-3 temperature-slider">
              <div className="main-value">{this.displayedTemperature}°</div>

              <div style={{ width: "80%", margin: "auto" }}>
                <Slider
                  min={5}
                  max={65}
                  step={1}
                  value={this.state.temperature}
                  onChange={temperature => this.setState({ temperature })}
                  trackStyle={{ background: MAIN_COLOR }}
                  marks={temperatureMarks}
                  dotStyle={{ display: "none" }}
                  handleStyle={{
                    marginLeft: -5,
                    border: "1px solid #eee",
                    boxShadow: "none",
                    width: 15,
                    height: 15
                  }}
                />
              </div>
            </div>

            <div className="new-schedule-time">
              <hr />
              <div className="color-main">
                <div className="font-13">Heating Time:</div>
                <div className="d-flex pt-2 pb-2">
                  <div className="w-50">
                    <span className="font-13 mr-2">Start:</span>
                    <Select
                      value={this.state.timeStart}
                      onChange={e =>
                        this.setState({ timeStart: e.target.value })
                      }
                      input={<Input />}
                      displayEmpty
                    >
                      {times.map(time => (
                        <MenuItem key={time + "key5"} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div className="w-50">
                    <span className="font-13 mr-2">End:</span>
                    <Select
                      value={this.state.timeEnd}
                      onChange={e => this.setState({ timeEnd: e.target.value })}
                      input={<Input />}
                      displayEmpty
                    >
                      {times.map(time => (
                        <MenuItem key={time + "key6"} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <hr />
            </div>

            <span
              onClick={() => this.addRange()}
              className="add-new-scheduler-btn color-main hover-opacity"
            >
              Save
            </span>
          </div>
        </Dialog>

        <div className="dashboard-card__header">WEEKLY SCHEDULE</div>

        <div className="dashboard-card__body text-center pb-1">
          <div className="schedule-wrapper">
            <div className="scheduler-days-headers">
              {daysHeaders.map((header, index) => (
                <div key={index} className="day-header">
                  {header.toUpperCase()}
                </div>
              ))}
            </div>

            <div className="scheduler-data-wrapper">
              {this.state.schedulerData.map((data, i) => (
                <div
                  key={i + "_key1"}
                  className="scheduler-day"
                  style={{
                    width: this.columnWidth * this.state.timePoints.length + 45
                  }}
                >
                  {data.map((item, j) => (
                    <div
                      key={j + "_key2"}
                      className="scheduler-range"
                      style={{
                        left: this.getRangeLeftPosition(item),
                        width: this.getRangeWidth(item)
                      }}
                    >
                      <div
                        className={`range-label ${
                          !item.status ? "turned-off" : ""
                        }`}
                      >
                        <span>{item.value}</span>
                        <div className="range-actions">
                          <div
                            onClick={() => this.openEditRangeDialog(i, j)}
                            className="icon hover-opacity"
                          >
                            <MaterialIcon icon="edit" />
                          </div>
                          <div
                            onClick={() => this.removeRange(i, j)}
                            className="icon hover-opacity"
                          >
                            <MaterialIcon icon="delete" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="scheduler-timeline">
                {this.state.timePoints.map((point, i) => (
                  <div
                    key={i + "_key3"}
                    className="timeline-point"
                    style={{ width: this.columnWidth }}
                  >
                    {point.type === "hour" && (
                      <div className="hour">
                        <span>{point.value}</span>
                        {i === 0 && <span>AM</span>}
                        {i === this.state.timePoints.length - 1 && (
                          <span>PM</span>
                        )}
                      </div>
                    )}
                    {point.type === "minute" && (
                      <div className="minute">{point.value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Scheduler;
