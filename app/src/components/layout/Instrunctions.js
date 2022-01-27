import React from 'react';

export default function Instrunctions() {
  return (
    <div>
      <h3>Lost and found final year project</h3>
      <div className="row">
        <div className="col-12 col-md-6">
          <h3>version1.0</h3>
          <ol>
            please follow these instructions:
            <li>
              <p>clone this repository from master branch by:</p>
              <p>
                git clone
                https://github.com/lost-and-found-final-project/lost-and-found.git
              </p>
            </li>
            <li>
              <p>
                creat your local branch, should be the same branch name on
                GitHub like this:
              </p>
              <p>git checkout -b development-branch</p>
            </li>
            <li>
              <p>
                after you create the branch local on your computer, you have to
                pull like this:
              </p>
              <p>git pull origin development-branch</p>
            </li>
            <li>
              <p>
                creat another local branch, should be the same branch name on
                GitHub like this:
              </p>
              <p>git checkout -b version1.0</p>
            </li>
            <li>
              <p>
                after you create the branch local on your computer, you have to
                pull like this:
              </p>
              <p>git pull origin version1.0</p>
            </li>
            <li>
              <h3>Important</h3>
              <p>
                after you create the branches development-branch and version1.0
              </p>
              <p>create your own branch like the following names:</p>
              <ul>
                <li>git checkout -b Nemer1.0</li>
                <li>git checkout -b Damir1.0</li>
                <li>git checkout -b Ribo1.0</li>
                <li>git checkout -b Niko1.0</li>
              </ul>
              <p>
                after you create your own branch: please push always to your
                branch like this:
              </p>
              <ul>
                <li>git push origin Nemer1.0</li>
                <li>git push origin Damir1.0</li>
                <li>git push origin Ribo1.0</li>
                <li>git push origin Niko1.0</li>
              </ul>
            </li>
          </ol>
          <h1>More instrunctions</h1>
          <ol>
            <li>
              <p>to know which branch you are :</p>
              <p>git branch</p>
            </li>
            <li>
              <p>to know branches on gitHub:</p> <p>git branch -a</p>
            </li>
            <li>
              <p>please always work on your branch and push to it like this:</p>
              <p>for example: git push origin Niko1.0</p>
            </li>
            <li>
              <p>
                please don't change to the branches development-branch or
                version1.0
              </p>
            </li>
            <li>don't hesitate to ask me for more info.</li>
            <h3>
              Note when you follow these instructions we decrease the risks and
              conflict while merging
            </h3>
            <h1>Big Thanks</h1>
            <h1>Good Luck</h1>
          </ol>
        </div>
        <div className="col-12 col-md-6">
          <h3>version2.0</h3>
          <ol>
            please follow these instructions:
            <li>
              <p>change to development-branch:</p>
              <p>git checkout development-branch</p>
            </li>
            <li>
              <p>pull development-branch pull like this:</p>
              <p>git pull origin development-branch</p>
            </li>
            <li>
              <p>
                Then creat another local branch, should be the same branch name
                on GitHub like this:
              </p>
              <p>git checkout -b version2.0</p>
            </li>
            <li>
              <p>
                after you create the branch local on your computer, you have to
                pull like this:
              </p>
              <p>git pull origin version2.0</p>
            </li>
            <li>
              <h3>Important</h3>
              <p>
                after you create the branches development-branch and version1.0
              </p>
              <p>create your own branch like the following names:</p>
              <ul>
                <li>git checkout -b Nemer2.0</li>
                <li>git checkout -b Damir2.0</li>
                <li>git checkout -b Ribo2.0</li>
                <li>git checkout -b Niko2.0</li>
              </ul>
              <p>
                after you create your own branch: please push always to your
                branch like this:
              </p>
              <ul>
                <li>git push origin Nemer2.0</li>
                <li>git push origin Damir2.0</li>
                <li>git push origin Ribo2.0</li>
                <li>git push origin Niko2.0</li>
              </ul>
            </li>
          </ol>
          <h1>More instrunctions</h1>
          <ol>
            <li>
              <p>to know which branch you are :</p>
              <p>git branch</p>
            </li>
            <li>
              <p>to know branches on gitHub:</p> <p>git branch -a</p>
            </li>
            <li>
              <p>
                please always work on your branch and push to it like this:
              </p>
              <p>for example: git push origin Niko2.0</p>
            </li>
            <li>
              <p>
                please don't change to the branches development-branch or
                version2.0
              </p>
            </li>
            <li>don't hesitate to ask me for more info.</li>
            <h3>
              Note when you follow these instructions we decrease the risks and
              conflict while merging
            </h3>
          </ol>
        </div>
      </div>
    </div>
  );
}
