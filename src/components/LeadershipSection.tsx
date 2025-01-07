'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

export default function LeadershipSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-12 gap-10 w-[95%] mx-auto px-8"
    >
      <Card className="bg-[#1E1E1E] md:col-span-4 min-h-[450px] border-0">
        <CardHeader className="p-8">
          <CardTitle className="text-[#FF4081] text-2xl">Athletics | Varsity Tennis Athlete</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0 text-base space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">NCAA Division 3 athlete</h4>
            </div>
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">SAAC team represantative</h4>
              <p>Served as Team representative for Student Athlete Associate Community and spearheaded campus events to promote atheltics around campus</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E1E1E] md:col-span-4 min-h-[450px] border-0">
        <CardHeader className="p-8">
          <CardTitle className="text-[#FF4081] text-2xl">Leadership & Involvement</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0 text-base space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Order of Omega Eta Tau (Greek Life Honor Society)</h4>
              <p>Vice-President</p>
            </div>
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Chi Psi Alpha Pi</h4>
              <p>Memeber of Standards Board</p>
              <p>Social Chair & Member of Executive Board</p>
            </div>
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Alpha Phi Omega (Service Fraternity)</h4>
              <p>New Member engaged in community service around campus and within nearby communities</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1E1E1E] md:col-span-4 min-h-[450px] border-0">
        <CardHeader className="p-8">
          <CardTitle className="text-[#FF4081] text-2xl">Honors & Achievements</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0 text-base space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Academic Excellence</h4>
              <p>Dean&apos;s List student</p>
              <p>Omicron Delta Epsilon Alpha Beta (Economics Honor Society)</p>
            </div>
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Departmental Recognition</h4>
              <p>Departmental Honors in Economics</p>
              <p>Departmental Honors in Computer Science</p>
            </div>
            <div>
              <h4 className="text-[#FF4081] font-semibold mb-2">Research Support</h4>
              <p>Secured competitive research grant for innovative Thesis Project</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
