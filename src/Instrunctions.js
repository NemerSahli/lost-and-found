import React from 'react';

export default function Instrunctions() {
  return (
    <div>
      <ol>
        please follow the instructions:
        <li>
          <p>clone this repository from master branch by:</p>
          <p>
            git clone
            https://github.com/lost-and-found-final-project/lost-and-found.git
          </p>
        </li>
        <li>
          <p>
            creat your local branch, should be the same branch name on GitHub
            like this:
          </p>
          <p>git checkout -b development-branch</p>
        </li>
        <li>
          <p>
            after you create the branch local on your computer, you have to pull
            like this:
          </p>
          <p>git pull origin development-branch</p>
        </li>
        <li>
          <p>
            creat another local branch, should be the same branch name on GitHub
            like this:
          </p>
          <p>git checkout -b version1.0</p>
        </li>
        <li>
          <p>
            after you create the branch local on your computer, you have to pull
            like this:
          </p>
          <p>git pull origin version1.0</p>
        </li>
        <li>
          <h3>Important</h3>
          <p>after you create the branches development-branch and version1.0</p>
          <p>create your own branch like the following names:</p>
          <ul>
            <li>git checkout -b Nemer1.0</li>
            <li>git checkout -b Damir1.0</li>
            <li>git checkout -b Ribo1.0</li>
            <li>git checkout -b Niko1.0</li>
          </ul>
          <p>
            after you create your own branch: please push always to your branch
            like this:
          </p>
          <ul>
            <li>git push origin Nemer1.0</li>
            <li>git push origin Damir1.0</li>
            <li>git push origin Ribo1.0</li>
            <li>git push origin Niko1.0</li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
