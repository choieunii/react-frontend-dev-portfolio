import React, { Component } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      foo: "bar",
      resumeData: {
        basic_info: {
          section_name: {
            about: "ABOUT ME",
            projects: "PROJECT",
            skills: "SKILLS",
            experience: "EXPERIENCE",
          },
          description_header: "Hello",
          description:
            "안녕하세요! 개발자를 준비하는 최은지 입니다. 새로운 것을 배우는 것을 좋아하고 배운 것을 문제 해결에 적용합니다. 또한 사용자가 원하는 서비스를 제공하기 위해 고민합니다. 원하는 목표를 이루기 위해 꾸준하게 노력하겠습니다. 맛있는 것을 좋아합니다:)",
        },
        experience: [
          {
            title: "목멱성",
            company: "밴드부",
            years: "2020-1",
            technologies: ["react", "nodejs", "javascript", "mongodb"],
            mainTech: ["react / nodejs"],
          },
          {
            title: "베스킨 라빈스",
            company: "baskin robbins 31",
            years: "2020-1",
            technologies: ["react", "nodejs", "javascript", "mongodb"],
            mainTech: ["react / nodejs"],
          },
          {
            title: "이디야",
            company: "Ediya",
            years: "2020-1",
            technologies: ["react", "nodejs", "javascript", "mongodb"],
            mainTech: ["react / nodejs"],
          },
          {
            title: "웹 개발 인턴",
            company: "Hubiz",
            years: "2020-1",
            technologies: ["react", "nodejs", "javascript", "mongodb"],
            mainTech: ["react / nodejs"],
          },
          {
            title: "달고나 커뮤니티",
            company: "대외활동",
            years: "2020-1",
            technologies: ["react"],
            mainTech: ["react / nodejs"],
          },
          {
            title: "미국 인턴",
            company: "51careers",
            years: "2020-1",
            technologies: ["javascript"],
            mainTech: ["진행중"],
          },
          {
            title: "외주 작업",
            company: "외주",
            years: "2020-1",
            technologies: ["진행중"],
            mainTech: ["진행중"],
          },
        ],
        projects: [],
      },
      sharedData: {
        basic_info: {
          name: "CHOI EUN JI 최은지",
          titles: ["DEVELOPER"],
          image: "eunji.jpg",
          social: [
            {
              name: "github",
              url: "https://github.com/choieunii",
              class: "fab fa-github",
            },
          ],
        },
        title: "title",
        skills: {
          icons: [
            { name: "HTML", class: "devicon-html5-plain" },
            { name: "CSS", class: "devicon-css3-plain" },
            { name: "Java", class: "devicon-java-plain" },
            { name: "Javascript", class: "devicon-javascript-plain" },
            { name: "React", class: "devicon-react-original" },
            { name: "Node.js", class: "devicon-nodejs-plain" },
            { name: "Spring", class: "devicon-java-plain" },
            { name: "Database", class: "devicon-mysql-plain" },
            { name: "Git", class: "devicon-git-plain" },
          ],
        },
      },
    };
  }

  applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
    this.swapCurrentlyActiveLanguage(oppositeLangIconId);
    document.documentElement.lang = pickedLanguage;
    var resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    this.loadResumeFromPath(resumePath);
  }

  swapCurrentlyActiveLanguage(oppositeLangIconId) {
    var pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
    document
      .getElementById(oppositeLangIconId)
      .removeAttribute("filter", "brightness(40%)");
    document
      .getElementById(pickedLangIconId)
      .setAttribute("filter", "brightness(40%)");
  }

  componentDidMount() {
    this.loadSharedData();
    this.applyPickedLanguage(
      window.$primaryLanguage,
      window.$secondaryLanguageIconId
    );
  }

  loadResumeFromPath(path) {
    $.ajax({
      url: path,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {},
    });
  }

  loadSharedData() {
    $.ajax({
      url: `portfolio_shared_data.json`,
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ sharedData: data });
        document.title = `${this.state.sharedData.basic_info.name}`;
      }.bind(this),
      error: function (xhr, status, err) {},
    });
  }

  render() {
    return (
      <div>
        <Header sharedData={this.state.sharedData.basic_info} />
        <div className="col-md-12 mx-auto text-center language">
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$primaryLanguage,
                window.$secondaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>
          </div>
          <div
            onClick={() =>
              this.applyPickedLanguage(
                window.$secondaryLanguage,
                window.$primaryLanguageIconId
              )
            }
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-poland"
              data-inline="false"
              id={window.$secondaryLanguageIconId}
            ></span>
          </div>
        </div>
        <About
          resumeBasicInfo={this.state.resumeData.basic_info}
          sharedBasicInfo={this.state.sharedData.basic_info}
        />
        <Projects
          resumeProjects={this.state.resumeData.projects}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Skills
          sharedSkills={this.state.sharedData.skills}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Experience
          resumeExperience={this.state.resumeData.experience}
          resumeBasicInfo={this.state.resumeData.basic_info}
        />
        <Footer sharedBasicInfo={this.state.sharedData.basic_info} />
      </div>
    );
  }
}

export default App;
