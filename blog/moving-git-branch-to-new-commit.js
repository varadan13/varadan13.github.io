
export default `
<p>To update your branch <span>initial-exploration</span> to point to a newer commit <span>d293dsfre</span> in the commit graph, you can follow these steps:</p>

<h2>1. Checkout the branch</h2>

<p>Make sure you're on the <span>initial-exploration</span> branch:</p>

<pre>
<code>
git checkout initial-exploration
</code>
</pre>

<h2>2. Update the branch to the desired commit</h2>

<p>Use the <code>git reset</code> command to move the branch pointer to the new commit (<span>d293dsfre</span>):</p>

<pre>
<code>
git reset --hard e3265da1
</code>
</pre>

<h2>3. Verify the branch's new position</h2>

<p>You can confirm that the branch now points to the desired commit by running:</p>

<pre>
<code>
git log --oneline
</code>
</pre>

<p>This will show you that <span>initial-exploration</span> is now at <span>d293dsfre</span>.</p>
`