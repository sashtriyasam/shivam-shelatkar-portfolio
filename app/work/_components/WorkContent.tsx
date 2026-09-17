'use client';

import { motion } from 'motion/react';
import { projects } from '@/lib/projects';
import { ProjectCard } from '@/components/projects/ProjectCard';

export default function WorkContent() {
  return (
    <div className='work' id='work'>
      <div className='content-max'>
        <header className='work__header'>
          <p className='eyebrow'>Selected work</p>
          <motion.h1
            className='work__title display'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            Work — music + builds
          </motion.h1>
          <motion.p
            className='work__intro'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Music releases and web builds from Thane—Mumbai — devotional songs,
            fusion EPs, orchestral arrangements, festival sites, and apps.
          </motion.p>
        </header>

        <motion.div
          className='work__grid'
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className='work__footer'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Want to build or score something together? Write to
          shelatkarshivam4@gmail.com.
        </motion.p>
      </div>
    </div>
  );
}
